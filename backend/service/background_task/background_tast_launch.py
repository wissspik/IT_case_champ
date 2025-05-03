from fastapi import FastAPI
from backend.main import app
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from contextlib import asynccontextmanager
from backend.service.background_task.background_task_config import update_data


scheduler = AsyncIOScheduler()

