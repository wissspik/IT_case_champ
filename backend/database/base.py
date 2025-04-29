import os
from typing import Annotated
from dotenv import load_dotenv
from fastapi.params import Depends
from sqlalchemy import select,text
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from backend.models.models import BankSistem,Base
from fastapi import APIRouter
from contextlib import asynccontextmanager
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL)

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
    result = await session.execute(text("SELECT COUNT(*) FROM bank_sistem"))
    len_before = result.scalar_one()
    new_rule = (BankSistem(bank = "Сбербанк",
                           country= "Абхазия",
                           currency="RUB",
                           method="mobile",
                           commision=1.0,
                           limit_min=0.0,
                           limit_max=1500000.0,
                           comments="15000-24;1500000-744"))
    session.add(new_rule)
    await session.commit()
    result = await session.execute(text("SELECT COUNT(*) FROM bank_sistem"))
    len_after = result.scalar_one()
    print(len_after - len_before)
    return {"message":True}