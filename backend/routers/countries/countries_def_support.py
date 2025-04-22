# Второй файл: парсер курсов без «213» и лишнего принта
from curl_cffi import requests
from backend.models.models import (
    exchange_rates_office_cashless_premium,
    exchange_rates_office_cashless,
)

def parse_rates(items):
    """
    Возвращает список кортежей:
    (ticker, tickerTitle, unit_str, buy_str, sell_str)
    """
    result = []
    for r in items:
        ticker = r.get('ticker', 'N/A')
        title  = r.get('tickerTitle', 'N/A')
        unit   = r.get('unit')
        buy    = r.get('buy')
        sell   = r.get('sell')

        unit_str = str(unit) if unit is not None else 'N/A'
        buy_str  = str(buy)  if buy  is not None else 'N/A'
        sell_str = str(sell) if sell is not None else 'N/A'

        result.append((ticker, title, unit_str, buy_str, sell_str))
    return result

def exchange_rates_office_cashless_done():
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

    resp = requests.get(api_url,
    params=params,
    headers=headers,
    proxies={"http": None, "https": None},   # ⟵ не использовать системный прокси
    http_version=2
                        )
    resp.raise_for_status()
    data = resp.json()
    result = []

    for section in data:
        if section.get('code') != 'exchange_rates_office_cashless':
            continue
        content = section.get('content', {})
        for segment_name in ('segment_regular', 'segment_premium'):
            seg_list = content.get(segment_name, [])
            for block in seg_list:
                rates = parse_rates(block.get('items', []))
                # собираем результат
                for t, name, u, buy, sell in rates:
                    result.append([t, u, buy, sell])
    return result
