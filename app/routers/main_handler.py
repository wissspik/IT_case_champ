from fastapi import APIRouter
from app.models.shapes import hello_message

app = APIRouter(tags=['main_handler'])

@app.post("/")
async def messages(message: hello_message):
    return {"message":True}

