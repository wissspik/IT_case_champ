from fastapi import FastAPI
from app.routers.view import app as view
from fastapi.middleware.cors import CORSMiddleware
from app.routers.commision import app as com

app = FastAPI() # запуск
@app.post("/")
async def f(look : S):
    print("12342142134")


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
