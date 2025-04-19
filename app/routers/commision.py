from curl_cffi import Session
from fastapi import APIRouter
from app.models.shapes import Countries
import requests

from bs4 import BeautifulSoup
from sqlalchemy import select
from app.database.base import SessionDep
from app.models.models import countries

app = APIRouter(tags=['countries'])

@app.post("/take_countries")
async def take_countries(session: SessionDep):
    array_country,array_picture = [],[]
    result = await session.execute(select(countries))
    countries_list = result.scalars().all()
    for i, country in enumerate(countries_list):
        array_country.append(country.country)
        array_picture.append(country.picture)
    return {'country_array': array_country, 'picture_array': array_picture}
'''
Здесь нужно добавить ручку по

'''