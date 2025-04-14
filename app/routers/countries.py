from fastapi import APIRouter
from app.models.shapes import Countries


app = APIRouter(tags=['countries'])

@app.post('/countries_handler')
async def currency_calculation(data : Countries):
    return {'Message':True}

