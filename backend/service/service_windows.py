from fastapi import APIRouter,HTTPException
from unicodedata import category

from backend.models.shapes import fitback_chat,delivery_question
from backend.database.base import SessionDep
from backend.models.models import servis_fitbacks
from sqlalchemy import select

app = APIRouter()


# ручка,которая добавляет оценку работы бота в таблицу
@app.post("/takes_fitback",
    summary="Получения fitback от пользователей насчет работы чат-бота",
    description="Принимает 2 поля: score(int,0 <= score <= 5) and message(str). В дальнейшем кладёт их в servis_fitback",)
async def takes_fitback(data:fitback_chat,session : SessionDep):
    if data.message and data.score:
        session.add(servis_fitbacks(score=data.score,comments=data.message))
    elif data.message:
        session.add(servis_fitbacks(comments=data.message))
    else:
        session.add(servis_fitbacks(score = data.score))
    await session.commit()
    return {'message': 'ok'}

@app.post("/delivery_question")
async def delivery_question(data : delivery_question, session : SessionDep):
    return {'message': 'ok'}

