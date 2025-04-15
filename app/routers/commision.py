from fastapi import APIRouter
from app.models.shapes import Countries

from sqlalchemy import select
from app.database.base import SessionDep
from app.models.models import countries

app = APIRouter(tags=['countries'])

@app.post('/countries_handler')
async def currency_calculation(data : Countries):
    ...
@app.post("/take_countries")
async def take_countries(session: SessionDep):
     stml = select(countries)
     result = await session.execute(stml)
     countries_list = result.scalars().all()
     result_list = []
     for country in countries_list:
         result_list.append(country.country)
         print(result_list)
     return result_list
