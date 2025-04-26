import os
from typing import Annotated
from dotenv import load_dotenv
from fastapi.params import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from backend.models.models import Base, countries_bank
from fastapi import APIRouter
from contextlib import asynccontextmanager
from backend.models.models import Banks
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
app = APIRouter(tags=['database'])
# ручка для добавлений таблиц в бд


@app.post("/create_all_tables")
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    return {'message':True}

'''
ПРЯМО СНИЗУ НАХОДИТСЯ РУЧКА ДЛЯ ДОБАВЛЕНИЯ БАНКОВ В БД !!!
'''
@app.post("/create_data")
async def create_data(session: SessionDep):
    stml = select(Banks).where(Banks.bank == 'Сбербанк')
    result = await session.execute(stml)
    res = result.scalars().one()
    link = countries_bank(country="RUS")
    res.countries.append(link)
    await session.commit()
    return {"message":"how am i?"}
# bank -> countries_many -> transfer_methods -> Currencies ->
'''
banks = []
for bank in banks:


'''