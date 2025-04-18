from fastapi import APIRouter
from app.models.shapes import Countries
from sqlalchemy import select
from app.database.base import SessionDep

app = APIRouter(tags=['countries'])

@app.post("/")
async def skopka(data : Countries,session :SessionDep):
    if data.currency_in == 'RUB':
        table = select(data.exchange_methods)
        result = await session.execute(table)
        query_buy = select(data.exchange_methods).where(data.exchange_methods.c.currency == currency)
        result_buy = await session.execute(query_buy)
        row_buy = result_buy.fetchone()
        buy = row_buy.buy  # сумма закупки валюты в рублях
        money = data.amount / buy
        result_number = int(money * 100) / 100
        return result_number
    elif data.currency_out == 'RUB':
        table = select(data.exchange_methods)
        result = await session.execute(table)
        query_sell = select(data.exchange_methods).where(data.exchange_methods.c.currency == currency)
        result_sell = await session.execute(query_sell)
        row_sell = result_sell.fetchone()
        sell = row_sell.sell  # сумма закупки валюты в рублях
        money = sell * data.amount
        result_number = int(money * 100) / 100
        return result_number
    else:
        table = select(data.exchange_methods)
        result = await session.execute(table)
        query_sell = select(data.exchange_methods).where(data.exchange_methods.c.currency == currency)
        result_sell = await session.execute(query_sell)
        row_sell = result_sell.fetchone()
        sell = row_sell.sell  # сумма закупки валюты в рублях
        money = sell * data.amount
        result_number = int(money * 100) / 100
        return result_number
    '''
        Рассматриваю 3 кейса: RUB -> OTH,OTH -> RUB,OTH -> OTH.
        Первый и второй кейс тривиальнный.Просто нахожу в бд данные по покупки или продаже валюты
        В третьем кейсе Я сначало нахожу в бд расценку для входной валюты,перевожу в рубли
        и свожу к кейсу RUB -> OTH
    '''
