import pytest
from httpx import AsyncClient
from backend.main import app

@pytest.fixture(scope="session")
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_take_banks(async_client):
    response = await async_client.get("/take_banks")
    assert response.status_code == 200
    assert response.json() == {"hello": "world"}
