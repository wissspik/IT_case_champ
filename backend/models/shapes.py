from pydantic import BaseModel,condecimal
from typing import Literal


class Countries(BaseModel):
    exchange_methods: Literal[
        'exchange_rates_internet_bank',
        'exchange_rates_cards',
        'exchange_rates_office_cash',
        'exchange_rates_office_cashless',
        'exchange_rates_office_cashless_premium'
    ]
    amount: condecimal(max_digits=12, decimal_places=2,ge=0) # 0 >=
    currency_in:str
    currency_out:str
class FitbackChat(BaseModel):
    score: Literal[0,1,2,3,4,5]
    comments: str
class DeliveryQuestion(BaseModel):
    category : Literal['exchange','currency'] # доступные категории для вопросов

class BankCommissions(BaseModel):
    currency : Literal[...]
    country: Literal[...]
    method: Literal['cash','bank_card','FN','phone_number']
    amount : condecimal(max_digits=12, decimal_places=2,ge=0)
