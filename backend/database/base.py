import os
from typing import Annotated
from dotenv import load_dotenv
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from contextlib import asynccontextmanager


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL,echo=True)

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


