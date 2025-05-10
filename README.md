# Vellor 🎵 — Музыкальный магазин (2025)

Полноценное приложение на **React + Node.js + PostgreSQL + MongoDB**, реализующее регистрацию, авторизацию и управление музыкальными треками. Стиль — минимализм, UI соответствует актуальным трендам 2025 года.

## 🚀 Функциональность

- ✅ Регистрация и авторизация пользователей
- ✅ Хранение токена авторизации
- ✅ Добавление треков с авторизацией
- ✅ Вывод списка всех треков
- ✅ Интуитивный минималистичный дизайн
- ✅ Backend: Express + PostgreSQL + MongoDB
- ✅ Frontend: React (Create React App) + обычный CSS

## 🛠 Стек технологий

- **Frontend:** React, CSS (без фреймворков)
- **Backend:** Node.js + Express
- **Базы данных:** PostgreSQL (SQL) и MongoDB (NoSQL)
- **Дополнительно:** JWT, bcrypt, CORS

## 🗂 Структура

```
vellor/
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── App.css
│       └── index.js
├── server/
│   ├── index.js
│   ├── routes/
│   ├── db/
│   └── models/
```

## ⚙️ Как запустить

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 🌐 Запросы API

- `POST /auth/register` — регистрация
- `POST /auth/login` — авторизация
- `GET /tracks` — получить все треки
- `POST /tracks` — добавить трек (нужен токен)

## 👤 Автор

Разработано студентом **РТУ МИРЭА**  
[GitHub профайл](https://github.com/Quokyo)
