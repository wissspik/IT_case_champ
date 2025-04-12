from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.banks import app as banks
from app.routers.countries import app as countries
from app.database.base import app as base_handler


app = FastAPI()
app.include_router(banks,tags=['banks'])
app.include_router(countries,tags=['countries'])
app.include_router(base_handler,tags=['base_handler'])




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
