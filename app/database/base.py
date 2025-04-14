from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker
from app.models.models import Base
from fastapi import APIRouter


engine = create_async_engine('sqlite+aiosqlite:///database.db?async_fallback=True')

new_session = async_sessionmaker(engine,expire_on_commit= False)

async def get_session():
    async with new_session() as session:
        yield session

app = APIRouter()

@app.post("/GO")
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    return {'message':True}