from fastapi import APIRouter
from app.models.shapes import Application
from curl_cffi import requests
import json


app = APIRouter()

@app.post("/")
async def skopka(data : Application):
    headers = {
        'accept': '*/*',
        'accept-language': 'ru,en;q=0.9',
        'priority': 'u=1, i',
        'referer': 'https://www.gazprombank.ru/personal/courses/',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "YaBrowser";v="25.2", "Yowser";v="2.5"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 YaBrowser/25.2.0.0 Safari/537.36',
    }

    params = {
        'ab_segment': 'segment08',
        'cityId': '617',
        'version': '3',
        'lang': 'ru',
    }

    api_url = 'https://www.gazprombank.ru/rest/exchange/rate'

    try:
        response = requests.get(api_url, params=params, headers=headers, impersonate="chrome110")
        response.raise_for_status()

        all_exchange_data = response.json()

        internet_bank_section = None
        for section in all_exchange_data:
            if section.get("code") == "exchange_rates_internet_bank":
                internet_bank_section = section
                break

        content_details = internet_bank_section["content"][0]

        currency_rates = content_details.get("items")
        last_updated_info = content_details.get("updated")

        for rate_info in currency_rates:
            currency_code = rate_info.get('ticker', 'N/A')
            currency_name = rate_info.get('tickerTitle', 'N/A')
            units = rate_info.get('unit', 'N/A')
            sell_rate = rate_info.get('buy', 'N/A')  # Клиент продает банку
            buy_rate = rate_info.get('sell', 'N/A')  # Клиент покупает у банка

            print(f"{currency_code:<10} {currency_name:<20} {str(units):<7} {str(sell_rate):<7} {str(buy_rate):<7}")


        last_updated_info = ...
        # сделай так,чтобы человек мог обменитьвать валюту из таблицы

