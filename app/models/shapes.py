from pydantic import BaseModel
from typing import Literal


class Application(BaseModel):
    banker: str
    submittedMessage : int
    valutate: str


class Countries(BaseModel):
    exchange_methods: Literal[
        'exchange_rates_internet_bank',
        'exchange_rates_mobile_app',
        'exchange_rates_cards',
        'exchange_rates_office_cash',
        'exchange_rates_office_cashless'
    ]
    amount: int # тут float,но 2 числа после запятой может быть.я сделаю чуток позже
    currency_in:str
    currency_out:str



