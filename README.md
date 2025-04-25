# Название проекта

Краткое однострочное описание, зачем и для кого этот проект.

## Содержание

- [Установка](#установка)
- [Использование](#использование)
- [API / Команды](#api--команды)
- [Контрибъюция](#контрибъюция)
- [Лицензия](#лицензия)

## Установка

Перед установкой проект нужно скачать .env файл:
1) способ(only DockerHub + .env)
```
# .env
CORS_ORIGINS = http://localhost:3000
DATABASE_URL = sqlite+aiosqlite:///database.db?async_fallback=True
ORIGINS=http://localhost:3000,https://myapp.example.com
```
Вставьте в одну деректорию с контейнером .env

```bash
docker pull wissspik/moisha-web
docker run -p 8000:8000 wissspik/moisha-web:latest

```
2. способ(github + Docker + .env)
```
git clone https://github.com/wissspik/IT_case_champ.git
# передейти в основную папку проекта и пропишить:
uvicorn backend.main:app --reload
cd frontend
npm start
```
После этого у вас откроется сайт проекта  

кст артурчик чепуха)