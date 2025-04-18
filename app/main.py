from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.banks import app as banks
from app.routers.commision import app as commision
from app.database.base import app as base_handler
from app.routers.countries.countries import app as script_handler
from app.routers.countries.countries import app as countries
from app.routers.test import app as test

app = FastAPI()
app.include_router(banks,tags=['banks'])
app.include_router(commision,tags=['commision'])
app.include_router(base_handler,tags=['base_handler'])

app.include_router(script_handler,tags=['script_handler'])

app.include_router(countries,tags=['countries'])

app.include_router(test,tags=['test'])




origins = [ # нужно скрыть в env
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# uvicorn app.main:app --reload команда для запуска сервера