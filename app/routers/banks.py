from  fastapi import APIRouter


from app.database.base import SessionDep
app = APIRouter(tags=['banks'])


@app.post("/take_banks")
async def take_commision(session : SessionDep):
    ...
