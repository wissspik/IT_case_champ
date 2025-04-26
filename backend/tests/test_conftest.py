import pytest
from httpx import AsyncClient, ASGITransport, Response
from backend.main import app

@pytest.mark.asyncio
async def test_take_countries():
    async with AsyncClient(transport=ASGITransport(app = app),base_url="http://test") as ac:
        response = await ac.post("/commission/take_countries",json={"message":True})
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
