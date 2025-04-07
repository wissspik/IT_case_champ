from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware

app = APIRouter(tags=['CORS'])

origins = [
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
