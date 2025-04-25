from sqlalchemy import text
from curl_cffi import requests
from backend.models.models import exchange_methods_all
from backend.database.base import get_session_support
from backend.routers.countries.countries_def_support import exchange_rates_office_cashless_done

async def update_data():
    async with get_session_support() as session:
        # Чистим таблицу
        table_name = exchange_methods_all.__tablename__
        await session.execute(text(f"DELETE FROM {table_name}"))
        # получаем сразу весь список: стандарт + премиум
        all_rates = exchange_rates_office_cashless_done()
        half = len(all_rates) // 2
        for idx, (currency, quantity, sell, buy) in enumerate(all_rates):
            model = (
                "exchange_rates_office_cashless"
                if idx < half
                else "exchange_rates_office_cashless_premium"
            )
            session.add(exchange_methods_all(
                currency=currency,
                category=model,  # или просто category=code
                buy=buy,
                sell=sell,
                quantity=quantity,
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
                proxies={"http": None, "https": None},# на случай если будет VPN OR ПРОКСИ
                http_version=2,
                timeout=60.0  # ждём до 60 секунд
                                )
        response.raise_for_status()
        all_exchange_data = response.json()

        # нахожу нужную секцию и добавляю все курсы за один заход
        for section in all_exchange_data:
            code = section["code"]
            if code not in (
                    "exchange_rates_internet_bank",
                    "exchange_rates_cards",
                    "exchange_rates_office_cash"
            ):
                continue

            for rate_info in section["content"][0].get("items", []):
                # значение code можно сразу сохранить в category
                q = int(rate_info.get("unit", 0))
                b = float(rate_info.get("sell", 0.0))
                s = float(rate_info.get("buy", 0.0))

                session.add(exchange_methods_all(
                    currency=rate_info.get("ticker", "N/A"),
                    category=code,  # вот теперь точно строка, а не класс
                    buy=b,
                    sell=s,
                    quantity=q,
                ))
        await session.commit()