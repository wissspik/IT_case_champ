from  fastapi import APIRouter
import requests
from sqlalchemy import select
from sqlalchemy.sql.visitors import replacement_traverse

from app.database.base import SessionDep
from bs4 import BeautifulSoup
from app.models.models import countries


app = APIRouter(tags=['banks'])
# ручка ,которая отдает список государств
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
@app.post("/take_banks")
async def take_commision(session : SessionDep):
    ...
