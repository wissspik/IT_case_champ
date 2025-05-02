import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.commission import app as commission
from backend.database.base import app as base
from backend.routers.countries.countries import app as countries
from backend.service.service_windows import app as service_windows
from backend.routers.countries.countries import lifespan
import os

load_dotenv()

app = FastAPI(lifespan=lifespan)
app.include_router(commission,prefix="/commission",tags=['commission'])
app.include_router(base,prefix="/base_test",tags=['database'])
app.include_router(service_windows,prefix = "/service_windows",tags=['service'])
app.include_router(countries,prefix = "/countries",tags=['countries'])

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

if __name__ == "__main__":
    #host = os.getenv("HOST", "0.0.0.0")
    #port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
