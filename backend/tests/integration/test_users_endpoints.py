import pytest
from backend.main import app
from sqlalchemy import text

@pytest.mark.asyncio
class TestCommission:
    @pytest.mark.parametrize('expected_status,expected_len', [
        (200, 2)
    ])
    async def test_take_countries(self, expected_status, expected_len, client):
        response = await client.post("/commission/take_countries")
        assert response.status_code == expected_status
        data = response.json()
        assert len(data) == expected_len
        assert isinstance(data, dict)
    @pytest.mark.parametrize('expected_status,expected_len', [
        (200, 1),
    ])
    async def test_take_currencies(self,expected_status, expected_len, client):
        response = await client.post("/commission/take_currencies")
        assert response.status_code == expected_status
        data = response.json()
        assert len(data) == expected_len
        assert isinstance(data, dict)
@pytest.mark.asyncio
class TestService:
    @pytest.mark.parametrize('payload,expected_status', [
        ({'score': -1, 'comments': 'asd'}, 422),
        ({'score': 6, 'comments': 'asd'}, 422),
        ({'score': 2, 'comments': None}, 422),
        ({'score': 6, 'comments': 'asd'}, 422),
        ({'score': 2, 'comments': 'asd'}, 201),
    ])
    async def test_take_fitbacks(self, payload, expected_status, client):
        response = await client.post("/service_windows/take_fitbacks", json=payload)
        assert expected_status == response.status_code
        if expected_status == response.status_code:
            data = response.json()
            assert isinstance(data, dict)
    @pytest.mark.parametrize('payload,expected_status', [
        ({'category': 'exchange'}, 200),
        ({'category': 'currency'}, 200),
        ({'category': '1223'}, 422),
    ])
    async def test_delivery_question(self, payload, expected_status, client):
        response = await client.post("/service_windows/delivery_question", json=payload)
        assert response.status_code == expected_status
        data = response.json()
        if expected_status == 200:
            assert len(data) == 2
            assert isinstance(data, dict)
@pytest.mark.asyncio
class TestCurrencyCalculation:
    @pytest.mark.parametrize('payload,expected_status', [
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 100, 'currency_in': 'RUB', 'currency_out': 'RUB'}, 200),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 100, 'currency_in': 'RUB', 'currency_out': 'USD'}, 200),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 100, 'currency_in': 'USD', 'currency_out': 'RUB'}, 200),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 100, 'currency_in': 'USD', 'currency_out': 'CNY'}, 200),
        ({'exchange_methods': 'OOO', 'amount': 100, 'currency_in': 'USD', 'currency_out': 'CNY'}, 422),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 0, 'currency_in': 'RUB', 'currency_out': 'USD'}, 200),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 0.00, 'currency_in': 'RUB', 'currency_out': 'USD'}, 200),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': -100, 'currency_in': 'RUB', 'currency_out': 'USD'}, 422),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 'str', 'currency_in': 'RUB', 'currency_out': 'USD'}, 422),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': None, 'currency_in': 'RUB', 'currency_out': 'USD'}, 422),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 100, 'currency_in': 'USS', 'currency_out': 'CNY'}, 404),
        ({'exchange_methods': 'exchange_rates_internet_bank', 'amount': 100, 'currency_in': 'USS', 'currency_out': 'SSSY'}, 404),
    ])
    async def test_currency_calculation(self, payload, expected_status, client):
        response = await client.post("/countries/currency_calculation", json=payload)
        assert response.status_code == expected_status
        if expected_status == 200:
            data = response.json()
            assert 'amount' in data
            amount = data['amount']
            # same currency
            if payload['currency_in'] == payload['currency_out']:
                assert amount == payload['amount']
            # zero amount
            elif payload['amount'] in (0, 0.00):
                assert amount in (0, 0.00)
            # specific conversions
        else:
            json_data = response.json()
            assert isinstance(json_data, dict)
            assert 'detail' in json_data or 'error' in json_data