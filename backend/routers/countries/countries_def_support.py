from curl_cffi import requests

def parse_rates(items):
    """
    Возвращает список кортежей:
    (ticker: str, title: str, unit: int, buy: float, sell: float)
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
    Получает курсы офисного безналичного обмена и возвращает список кортежей:
    (ticker: str, unit: int, buy: float, sell: float)
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
