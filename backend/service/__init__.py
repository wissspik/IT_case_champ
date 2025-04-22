from fastapi import APIRouter
from backend.models.shapes import sum_number
app = APIRouter()




@app.post("/choose_button")
async def choose_button(data : sum_number):
    return {'s':'ok'}