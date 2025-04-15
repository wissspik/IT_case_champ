from fastapi import APIRouter
from app.models.shapes import Countries
from sqlalchemy import select
from app.database.base import SessionDep
from app.models.models import exchange_rates_internet_bank,exchange_rates_mobile_app,exchange_rates_cards,exchange_rates_office_cash,exchange_rates_office_cashless
from app.service.countries_service import support_in_rub,support_out_rub
app = APIRouter()

@app.post("/")
async def skopka(data : Countries,session :SessionDep):
    if data.currency_in == 'RUB':
        return await support_in_rub(data.currency_out,data.amount,session,data.exchange_methods)
    elif data.currency_out == 'RUB':
        return await support_out_rub(data.currency_in,data.amount,session,data.exchange_methods)
    else:
        table = select(data.exchange_methods)
        result = await session.execute(table) # delete
        query_sell = select(data.exchange_methods).where(data.exchange_methods.c.currency == data.currency_in)
        result_sell= await session.execute(query_sell)
        row_sell = result_sell.fetchone()
        sell = row_sell.sell
        amount_rub = data.amount * sell
        return await support_in_rub(data.currency_out,data.amount,session,data.exchange_methods)
    '''
        Рассматриваю 3 кейса: RUB -> OTH,OTH -> RUB,OTH -> OTH.
        Первый и второй кейс тривиальнный.Просто нахожу в бд данные по покупки или продаже валюты
        В третьем кейсе Я сначало нахожу в бд расценку для входной валюты,перевожу в рубли
        и свожу к кейсу RUB -> OTH
    '''
