from fastapi import APIRouter,HTTPException
from sqlalchemy import insert
import pandas as pd
import numpy as np
from backend.database.base import engine,SessionDep
from backend.database.models import Base,BankSistem

from decimal import Decimal
app = APIRouter()

@app.post("/create_all_tables",
          summary="Создание всех таблиц в БД"
          )
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    return {'message':True}

