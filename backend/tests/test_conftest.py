import pytest
from backend.main import app
from sqlalchemy import text
class TestCommission:
    #ручка с выдачей стран
    @pytest.mark.asyncio
    @pytest.mark.parametrize('payload,expected_status,expected_len',[
        ({"message":True},200,2),# проверка на длину получения JSON
        ({"message":True},200,3),
    ])
    async def test_take_countries(payload,expected_status,expected_len,client):
            response = await client.post("/commission/take_countries",json=payload)
            assert response.status_code == expected_status
            if expected_len is not None:
                assert len(response.json()) == expected_len
    @pytest.mark.asyncio
    @pytest.mark.parametrize('payload,expected_status,expected_len',[
        ({"message":True},200,2),# проверка на длину получения JSON
        ({"message":True},200,1),
    ])
    # тест на получения списка валют
    async def test_take_currencies(payload,expected_status,expected_len,client):
        response = await client.post("/commission/take_currencies",json=payload)
        assert response.status_code == expected_status
        if expected_len is not None:
            assert len(response.json()) == expected_len
        # тест на получения

@pytest.mark.asyncio
@pytest.mark.parametrize('payload,expected_status',[
    ({'score':-1,'comments':'asd'},201), # тест на пограничные значения
    ({'score':6,'comments':'asd'},201),
    ({'score':2,'comments': None},201),
    ({'score':6,'comments':'asd'},200),
    ({'score':2,'comments':'asd'},201), # тест на правильный случай
])
async def test_take_fitbacks(payload,expected_status,client):
    response = await client.post("/service_windows/take_fitbacks",json=payload)
    assert response.status_code == expected_status
    len_before,len_after = response.json()['len_before'],response.json()['len_after']
    if expected_status == 201:
        assert len_after - len_before == 1
    else:
        assert len_after == len_before
@pytest.mark.asyncio
@pytest.mark.parametrize('payload,expected_status', [
    ({'category':'Вклад'}, 200),  # тест на пограничные значения
    ({'category':'Валюты'},200),
    ({'category':12}, 422), # тест на правильный случай
    ({'category':'1223'},422),
])
async def test_delivery_question(payload,expected_status,client):
    response = await client.post("/commission/delivery_question",json={'message':'ok'})
    assert response.status_code == expected_status
    if response.status_code == expected_status:
        assert len(response.json()) == 2
#class TestCountries