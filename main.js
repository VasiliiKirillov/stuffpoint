const modal = document.getElementById("contact-modal");
const openButtons = document.querySelectorAll("[data-open-modal]");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const yearNode = document.getElementById("year");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("contact-form-status");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const openModal = () => {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

openButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeModal();
  }
});

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const originalText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Отправляем...";
    }

    if (formStatus) {
      formStatus.textContent = "";
      formStatus.classList.remove("is-success", "is-error");
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Не удалось отправить заявку.");
      }

      contactForm.reset();
      if (formStatus) {
        formStatus.textContent = "Заявка отправлена. Скоро свяжемся с вами.";
        formStatus.classList.add("is-success");
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = error.message || "Ошибка отправки. Попробуйте еще раз.";
        formStatus.classList.add("is-error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
}
