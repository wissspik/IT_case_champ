from typing import Annotated

from fastapi.params import Depends
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from app.models.models import Base
from fastapi import APIRouter


engine = create_async_engine('sqlite+aiosqlite:///database.db?async_fallback=True')

new_session = async_sessionmaker(engine,expire_on_commit= False)

async def get_session():
    async with new_session() as session:
        yield session

SessionDep = Annotated[AsyncSession,Depends(get_session)]
app = APIRouter()

@app.post("/GO")
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    return {'message':True}