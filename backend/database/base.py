import os
from typing import Annotated
from dotenv import load_dotenv
from fastapi.params import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from backend.models.models import BankSistem,Base
from fastapi import APIRouter
from contextlib import asynccontextmanager
load_dotenv()


url_base = os.getenv("DATABASE_URL")

engine = create_async_engine(url_base)

new_session = async_sessionmaker(engine,expire_on_commit= False)


async def get_session():
    async with new_session() as session:
        yield session

@asynccontextmanager
async def get_session_support():
    async with new_session() as session:
        yield session
# переменная,для выдачи сессий
SessionDep = Annotated[AsyncSession,Depends(get_session)]
app = APIRouter()
# ручка для добавлений таблиц в бд


@app.post("/create_all_tables",
          summary="Создание всех таблиц в БД"
          )
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    return {'message':True}

'''
ПРЯМО СНИЗУ НАХОДИТСЯ РУЧКА ДЛЯ ДОБАВЛЕНИЯ БАНКОВ В БД !!!
'''
@app.post("/create_data")
async def create_data(session: SessionDep):
    for x in range(2000):
        new_rule = BankSistem(
            bank='Сбербанк',
            country='Германия',
            method='SWIFT',
            currency='EUR',
            commision=1.5,  # 1.5%
            limit_max=x,  # максимальный лимит 100 000 EUR
            comments='Стандартная комиссия по SWIFT-переводам'
        )
        session.add(new_rule)
    await session.commit()
    return {"message":True}