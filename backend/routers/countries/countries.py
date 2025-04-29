from apscheduler.schedulers.asyncio import AsyncIOScheduler
from backend.routers.countries.countries_background_task import update_data
from decimal import Decimal, ROUND_DOWN
from fastapi import HTTPException,FastAPI,APIRouter
from backend.models.models import Base
from backend.models.shapes import Countries
from backend.database.base import SessionDep
from sqlalchemy import select,and_
from contextlib import asynccontextmanager
from backend.models.models import exchange_methods_all

app = APIRouter()

scheduler = AsyncIOScheduler()

#      фоновая задача

@asynccontextmanager
async def lifespan(app: FastAPI):
    # === start ===
    if not scheduler.get_job('update_data_job'):
        scheduler.add_job(
            update_data,
            trigger='interval',
            seconds=20,# 86400
            id='update_data_job',
            replace_existing=True,
        )
    # Запускаем планировщик, если ещё не запущен
    if not scheduler.running:
        scheduler.start()

    yield  # здесь приложение работает

    # === shutdown ===
    if scheduler.running:
        scheduler.shutdown()


@app.post("/currency_calculation")
async def currency_calculation(data: Countries, session : SessionDep):
    table_name = data.exchange_methods  # строка, напр. "usd_rates"
    table = Base.metadata.tables.get(table_name)
    async def fetch_rate(currency: str) -> tuple[Decimal, Decimal]:
        # table — это Table, полученный по имени
        stmt = select(
            exchange_methods_all.buy,
            exchange_methods_all.sell
        ).where(
            (exchange_methods_all.currency == currency) &
            (exchange_methods_all.category == data.exchange_methods)
        )
        result = await session.execute(stmt)
        row = result.first()
        if not row:
            raise HTTPException(404, f"Rate for {currency} not found")
        return Decimal(str(row.buy)), Decimal(str(row.sell))

    amt = Decimal(str(data.amount))

    if data.currency_in == data.currency_out:
        return {'amount':data.amount}
    elif data.currency_in == 'RUB':
        buy_target, _ = await fetch_rate(data.currency_out)
        converted = amt / buy_target

    elif data.currency_out == 'RUB':
        _, sell_source = await fetch_rate(data.currency_in)
        converted = sell_source * amt
    else:
        # OTH -> OTH: сначала в RUB, потом в целевую валюту
        _, sell_source = await fetch_rate(data.currency_in)
        buy_target, _ = await fetch_rate(data.currency_out)
        rub_amount = sell_source * amt
        converted = rub_amount / buy_target

    # округляем "вниз" до двух знаков
    return {'amount':float(converted.quantize(Decimal('0.01'), rounding=ROUND_DOWN))}

