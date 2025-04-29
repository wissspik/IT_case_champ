from pydantic import BaseModel,condecimal
from typing import Literal


class Application(BaseModel):
    banker: str
    submittedMessage : int
    valutate: str


class Countries(BaseModel):
    exchange_methods: Literal[
        'exchange_rates_internet_bank',
        'exchange_rates_cards',
        'exchange_rates_office_cash',
        'exchange_rates_office_cashless',
        'exchange_rates_office_cashless_premium'
    ]
    amount: condecimal(max_digits=12, decimal_places=2)
    currency_in:str
    currency_out:str
class fitback_chat(BaseModel):
    score: Literal[0,1,2,3,4,5]
    comments: str
class delivery_question(BaseModel):
    category : Literal['exchange','currency'] # доступные категории для вопросов

