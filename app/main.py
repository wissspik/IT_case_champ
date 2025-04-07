from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.main_handler import app as main_handler


app = FastAPI()


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

app.include_router(main_handler,tags=['main_handler'])
