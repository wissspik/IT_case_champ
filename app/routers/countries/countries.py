from fastapi import APIRouter
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.routers.countries.countries_background_task import update_data
from decimal import Decimal, ROUND_DOWN
from fastapi import HTTPException
from app.models.shapes import Countries
from app.database.base import SessionDep
from sqlalchemy import select
app = APIRouter(tags=['currency'])

scheduler = AsyncIOScheduler()

@app.on_event("startup")
async def start_scheduler():
    # Регистрируем задачу один раз
    if not scheduler.get_job('update_data_job'):
        scheduler.add_job(
            update_data,
            'interval',
            seconds=15,
            id='update_data_job',
            replace_existing=True
        )
    # Запускаем только если ещё не запущен
    if not scheduler.running:
        scheduler.start()

@app.on_event("shutdown")
async def shutdown_scheduler():
    if scheduler.running:
        scheduler.shutdown()

'''
Ручка требует доработки
@app.post("/currency_calculation")
async def currency_calculation(data: Countries, session: SessionDep):
    table = data.exchange_methods.__table__

    async def fetch_rate(currency: str) -> tuple[Decimal, Decimal]:
        query = select(table.c.buy, table.c.sell).where(table.c.currency == currency)
        result = await session.execute(query)
        row = result.first()
        if row is None:
            raise HTTPException(status_code=404, detail=f"Rate for {currency} not found")
        # возвращаем Decimal для точных расчётов
        return Decimal(str(row.buy)), Decimal(str(row.sell))

    amt = Decimal(str(data.amount))

    if data.currency_in == 'RUB':
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
    return float(converted.quantize(Decimal('0.01'), rounding=ROUND_DOWN))
'''