from  fastapi import APIRouter
from backend.database.base import SessionDep
app = APIRouter(tags=['banks'])


@app.post("/take_banks")
async def take_commision():
    return {'message': 'ok'}