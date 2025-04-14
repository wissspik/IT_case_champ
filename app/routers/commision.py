from fastapi import APIRouter
from app.models.shapes import Application
from pydantic import BaseModel

app = APIRouter()

@app.post("/")
async def ffff(data : Application):
    ...
