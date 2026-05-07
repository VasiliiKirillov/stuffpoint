# Stuffpoint Recruitment Landing

Статический одностраничный лендинг для кадрового агентства.

## Локальный запуск

```bash
python3 -m http.server 8000
```

Открыть: `http://127.0.0.1:8000`

## Настройка формы Web3Forms

В файле `index.html` замените:

- `YOUR_WEB3FORMS_ACCESS_KEY`

на ваш реальный ключ Web3Forms.

## GitHub Pages (main / root)

1. Создайте новый пустой репозиторий на GitHub.
2. Подключите remote и отправьте код:

```bash
git remote add origin <YOUR_GITHUB_REPO_URL>
git add .
git commit -m "Initial recruitment landing"
git push -u origin main
```

3. В GitHub откройте `Settings -> Pages`.
4. В `Build and deployment` выберите:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
5. Сохраните и дождитесь публикации.

При необходимости кастомного домена добавьте файл `CNAME` в корень проекта.
