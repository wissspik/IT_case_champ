
from sqlalchemy import text
from curl_cffi import requests
from backend.models.models import exchange_rates_internet_bank, exchange_rates_office_cashless, \
    exchange_rates_office_cashless_premium, exchange_rates_cards,exchange_rates_office_cash
from backend.database.base import get_session_support
from backend.routers.countries.countries_def_support import exchange_rates_office_cashless_done

async def update_data():
    async with get_session_support() as session:
        # получаем сразу весь список: стандарт + премиум
        all_rates = exchange_rates_office_cashless_done()
        half = len(all_rates) // 2
        for idx, (currency, quantity, sell, buy) in enumerate(all_rates):
            model = (
                exchange_rates_office_cashless
                if idx < half
                else exchange_rates_office_cashless_premium
            )
            session.add(model(
                currency=currency,
                quantity=quantity,
                sell=sell,
                buy=buy,
            ))
        # один общий коммит после всех офисных курсов
        await session.commit()

        # теперь интернет-банк
        headers = {
            'accept': '*/*',
            'accept-language': 'ru,en;q=0.9',
            'Connection': 'close',
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

        response = requests.get(api_url,
                params=params,
                headers=headers,
                proxies={"http": None, "https": None},   # ⟵ не использовать системный прокси
                http_version=2,
                timeout=60.0  # ждём до 60 секунд
                                )
        response.raise_for_status()
        all_exchange_data = response.json()

        # находим нужную секцию и добавляем все курсы за один заход
        for section in all_exchange_data:
            code = section.get("code")
            if code not in ("exchange_rates_internet_bank",
                            "exchange_rates_cards",
                            "exchange_rates_office_cash"):
                continue

            items = section["content"][0].get("items", [])
            for rate_info in items:
                # 1) quantity → int
                raw_unit = rate_info.get("unit", 0)
                try:
                    quantity = float(raw_unit)
                except (TypeError, ValueError):
                    quantity = 0

                # 2) buy/sell → float
                raw_buy = rate_info.get("sell", 0.0)
                raw_sell = rate_info.get("buy", 0.0)
                try:
                    buy = float(raw_buy)
                except (TypeError, ValueError):
                    buy = 0.0
                try:
                    sell = float(raw_sell)
                except (TypeError, ValueError):
                    sell = 0.0

                # 3) выбрать модель
                if code == "exchange_rates_internet_bank":
                    Model = exchange_rates_internet_bank
                elif code == "exchange_rates_cards":
                    Model = exchange_rates_cards
                else:
                    Model = exchange_rates_office_cash
                table_name = Model.__tablename__
                await session.execute(text(f"DELETE FROM  {table_name} "))
                # !!! id в таблице будут увеличиваться
                session.add(Model(
                    quantity=quantity,
                    currency=rate_info.get("ticker", "N/A"),
                    buy=buy,
                    sell=sell,
                ))
        # один коммит после всех интернет-курсов
        await session.commit()
