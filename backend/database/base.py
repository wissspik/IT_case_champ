import os
from typing import Annotated
from dotenv import load_dotenv
from fastapi.params import Depends
from decimal import Decimal
from sqlalchemy import select,text,insert
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from backend.models.models import BankSistem,Base
from fastapi import APIRouter
from contextlib import asynccontextmanager
load_dotenv()
import random


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
ALL_BANKS = [
    "Альфа-банк", "МТС банк", "Ozon банк", "ВТБ", "Газпромбанк",
    "Т-банк", "Почта Банк", "Россельхозбанк", "Сбербанк", "ЮMoney"
]
ALL_COUNTRIES = [
    "Узбекистан", "Киргизия", "Беларусь", "Таджикистан", "Абхазия",
    "Армения", "Южная Осетия", "Казахстан", "Азербайджан", "Китай",
    "Вьетнам", "Иран", "Сербия", "ОАЭ", "Израиль", "Грузия",
    "Кипр", "Греция", "Корея (Республика)", "Турция", "Монголия",
    "Молдова", "Таиланд", "Приднестровье", "Индонезия", "Индия",
    "Филиппины"
]
ALL_CURRENCIES = [
    "UZS", "KGS", "BYN", "TJS", "RUB", "AMD", "KZT", "AZN", "CNY",
    "VND", "IRR", "RSD", "AED", "ILS", "GEL", "EUR", "KRW", "TRY",
    "MNT", "MDL", "THB", "IDR", "INR", "PHP"
]
ALL_METHODS = ['cash','bank_card','FN','phone_number']

@app.post("/create_data")
async def create_data(session: SessionDep):
    total_rows = 100_000
    batch_size = 1_000
    batch = []

    for i in range(total_rows):
        # случайные границы лимитов
        min_amt = Decimal(random.uniform(0, 500_000)).quantize(Decimal("0.00"))
        max_amt = (min_amt + Decimal(random.uniform(1_000, 2_000_000))
                   .quantize(Decimal("0.00")))

        # в комментариях — просто пример
        comments = f"{min_amt}-{random.randint(10, 720)};{max_amt}-{random.randint(10, 720)}"

        batch.append({
            "bank":      random.choice(ALL_BANKS),
            "country":   random.choice(ALL_COUNTRIES),
            "currency":  random.choice(ALL_CURRENCIES),
            "method":    random.choice(ALL_METHODS),
            "commision": float(round(random.uniform(0.5, 5.0), 2)),
            "limit_min": float(min_amt),
            "limit_max": float(max_amt),
            "comments":  comments,
        })

        # как только накопили batch_size — вкидываем в БД и сбрасываем список
        if len(batch) >= batch_size:
            await session.execute(
                insert(BankSistem),
                batch
            )
            await session.commit()
            batch.clear()

    # остаток, если total_rows не кратно batch_size
    if batch:
        await session.execute(
            insert(BankSistem),
            batch
        )
        await session.commit()

    return {"inserted": total_rows}