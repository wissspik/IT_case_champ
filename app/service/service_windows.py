from fastapi import APIRouter,HTTPException
from app.models.shapes import fitback_chat,delivery_question
from app.database.base import SessionDep
from app.models.models import servis_fitbacks
from sqlalchemy import select

app = APIRouter(tags=['service'])


# ручка,которая добавляет оценку работы бота в таблицу
@app.put("/takes_fitback")
async def takes_fitback(data:fitback_chat,session : SessionDep):
    session.add(servis_fitbacks(score=data.score))
    await session.commit()
    return {'message':'ok'}
'''
ручка для добавлений данных для ответов.
'''


@app.post("/delivery_question")
async def delivery_question(data : delivery_question, session : SessionDep):
    corw = data.category


    stmt = select(servis_fitbacks).where(servis_fitbacks.category == corw)


    result = await session.execute(stmt)
    item = result.scalar_one_or_none()  # !!! вытаскиваем модель или None

    if item is None:
        raise HTTPException(status_code=404, detail="Запись не найдена")

    return {
        "question": item.question,
        "answer": item.answer
    }

