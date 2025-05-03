from sqlalchemy import text
from backend.database.models import ExchangeMethodsAll
from backend.database.base import get_session_support

async def update_data():
    '''
        Функция для парсинга данных.
        Заполняет таблицу в бд с ценами валют(парсинг из сайта:https://www.gazprombank.ru/personal/courses/).
    '''
    async with get_session_support() as session:
        # Чистим таблицу перед вставкой новых курсов
        table_name = ExchangeMethodsAll.__tablename__
        await session.execute(text(f"DELETE FROM {table_name}"))

        # Получаем курсы офисного безналичного обмена (стандарт + премиум)
        all_rates = exchange_rates_office_cashless_done()
        half = len(all_rates) // 2

        for idx, (currency, quantity, buy, sell) in enumerate(all_rates):
            category = (
                "exchange_rates_office_cashless"
                if idx < half
                else "exchange_rates_office_cashless_premium"
            )
            # Передаём в поля уже конвертированные числовые типы
            session.add(ExchangeMethodsAll(
                currency=currency,
                category=category,
                buy=buy,
                sell=sell,
                quantity=quantity
            ))

        # Коммитим офисные курсы
        await session.commit()

        # Дальше — курсы интернет-банка и карт
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
            'user-agent': (
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                'AppleWebKit/537.36 (KHTML, like Gecko) '
                'Chrome/132.0.0.0 YaBrowser/25.2.0.0 Safari/537.36'
            ),
        }
        params = {
            'ab_segment': 'segment08',
            'cityId': '617',
            'version': '3',
            'lang': 'ru',
        }
        api_url = 'https://www.gazprombank.ru/rest/exchange/rate'

        response = requests.get(
            api_url,
            params=params,
            headers=headers,
            proxies={"http": None, "https": None},
            http_version=2,
            timeout=60.0
        )
        response.raise_for_status()
        all_exchange_data = response.json()

        for section in all_exchange_data:
            code = section.get("code")
            if code not in (
                "exchange_rates_internet_bank",
                "exchange_rates_cards",
                "exchange_rates_office_cash"
            ):
                continue

            for rate_info in section.get("content", [])[0].get("items", []):
                q = int(rate_info.get("unit", 0))
                b = float(rate_info.get("sell", 0.0))
                s = float(rate_info.get("buy", 0.0))

                session.add(ExchangeMethodsAll(
                    currency=rate_info.get("ticker", "N/A"),
                    category=code,
                    buy=b,
                    sell=s,
                    quantity=q,
                ))
        # Коммитим интернет-банковские и картовые курсы
        await session.commit()
from curl_cffi import requests

def parse_rates(items):
    """
    Выполняет парсинг списка курсов и возвращает готовые к использованию кортежи.

    Args:
        items (list of dict): Список словарей с полями:
            - 'ticker' (str): Код валюты.
            - 'tickerTitle' (str): Название валюты.
            - 'unit' (int/str): Количество единиц, к которым привязан курс.
            - 'buy' (float/str): Цена покупки.
            - 'sell' (float/str): Цена продажи.

    Returns:
        list of tuple: Список кортежей по формату:
            - ticker (str): Код валюты.
            - title (str): Название валюты.
            - unit (int): Количество единиц.
            - buy (float): Цена покупки.
            - sell (float): Цена продажи.
    """
    result = []
    for r in items:
        ticker = r.get('ticker', 'N/A')
        title = r.get('tickerTitle', 'N/A')
        unit = r.get('unit')
        buy = r.get('buy')
        sell = r.get('sell')

        try:
            unit_int = int(unit) if unit is not None else 0
        except (ValueError, TypeError):
            unit_int = 0

        try:
            buy_f = float(buy) if buy is not None else 0.0
        except (ValueError, TypeError):
            buy_f = 0.0

        try:
            sell_f = float(sell) if sell is not None else 0.0
        except (ValueError, TypeError):
            sell_f = 0.0

        result.append((ticker, title, unit_int, buy_f, sell_f))
    return result

def exchange_rates_office_cashless_done():
    """
    Получает и парсит курсы офисного безналичного обмена Газпромбанка.

    Выполняет HTTP-запрос к публичному API Газпромбанка, фильтрует секцию
    'exchange_rates_office_cashless' и собирает курсы из блоков
    'segment_regular' и 'segment_premium' через функцию parse_rates.

    Args:
        None

    Returns:
        list of tuple: Список кортежей курсов по формату:
            - ticker (str): Код валюты.
            - unit (int): Количество единиц валюты.
            - buy (float): Цена покупки.
            - sell (float): Цена продажи.

    Raises:
        HTTPError: Если запрос к API возвращает ошибочный статус.
    """
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
        'user-agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/132.0.0.0 YaBrowser/25.2.0.0 Safari/537.36'
        ),
    }
    params = {
        'ab_segment': 'segment08',
        'cityId': '617',
        'version': '3',
        'lang': 'ru',
    }
    api_url = 'https://www.gazprombank.ru/rest/exchange/rate'

    response = requests.get(
        api_url,
        params=params,
        headers=headers,
        proxies={"http": None, "https": None},
        http_version=2
    )
    response.raise_for_status()
    data = response.json()

    result = []
    for section in data:
        if section.get('code') != 'exchange_rates_office_cashless':
            continue
        content = section.get('content', {})
        for segment_name in ('segment_regular', 'segment_premium'):
            for block in content.get(segment_name, []):
                rates = parse_rates(block.get('items', []))
                for ticker, title, unit_int, buy_f, sell_f in rates:
                    result.append((ticker, unit_int, buy_f, sell_f))
    return result
