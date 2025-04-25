import os
from typing import Annotated
from dotenv import load_dotenv
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from backend.models.models import Base
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
app = APIRouter(tags=['base'])
# ручка для добавлений таблиц в бд


@app.post("/GO")
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    return {'message':True}