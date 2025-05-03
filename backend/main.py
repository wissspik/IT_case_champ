from apscheduler.schedulers.asyncio import AsyncIOScheduler
from contextlib import asynccontextmanager
from backend.service.background_task.background_task_config import update_data
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.commission import app as commission
from backend.routers.db import app as base
from backend.routers.countries import app as countries
from backend.routers.service_windows import app as service_windows

load_dotenv()
scheduler = AsyncIOScheduler()
@asynccontextmanager
async def lifespan(app: FastAPI):
    '''
    Начинает процессы фоновых задач.

   Args:
       app (FastAPI): приложение FastAPI.
    '''
    # === start ===
    if not scheduler.get_job('update_data_job'):
        scheduler.add_job(
            update_data,
            trigger='interval',
            seconds=20,# 86400
            id='update_data_job',
            replace_existing=True,
        )
    # Запускаем планировщик, если ещё не запущен
    if not scheduler.running:
        scheduler.start()

    yield  # здесь приложение работает

    # === shutdown ===
    if scheduler.running:
        scheduler.shutdown()

app = FastAPI(lifespan=lifespan)
app.include_router(commission,prefix="/commission",tags=['commission'])
app.include_router(base,prefix="/base_handler",tags=['database'])
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
