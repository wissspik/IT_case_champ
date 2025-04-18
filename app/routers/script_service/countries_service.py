from app.database.base import SessionDep
from sqlalchemy import select

async def support_in_rub(currency,amount,session:SessionDep,select_table):
    table = select(select_table)
    result = await session.execute(table)
    query_buy = select(select_table).where(select_table.c.currency == currency)
    result_buy = await session.execute(query_buy)
    row_buy = result_buy.fetchone()
    buy = row_buy.buy # сумма закупки валюты в рублях
    money =  amount / buy
    result_number = int(money * 100) / 100
    return result_number

async def support_out_rub(currency,amount,session:SessionDep,select_table):
    table = select(select_table)
    result = await session.execute(table)
    query_sell = select(select_table).where(select_table.c.currency == currency)
    result_sell = await session.execute(query_sell)
    row_sell = result_sell.fetchone()
    sell = row_sell.sell # сумма закупки валюты в рублях
    money = sell * amount
    result_number = int(money * 100) / 100
    return result_number
