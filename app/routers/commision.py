from fastapi import APIRouter
from app.models.shapes import Application
from pydantic import BaseModel

class S(BaseModel):
    message: str

app = APIRouter()

@app.post("/")
async def f(look : S): #application: Application
    print("12342142134")
