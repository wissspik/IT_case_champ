import pytest
from backend.main import app
from httpx import AsyncClient, ASGITransport

@pytest.fixture(scope="function")
async def client():
    '''
    Возращается
    '''
    transport = ASGITransport(app=app)
    async with AsyncClient(transport = transport, base_url="http://test") as ac:
        yield ac