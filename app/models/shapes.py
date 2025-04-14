from pydantic import BaseModel
from typing import Literal

class hello_message(BaseModel):
    message: str


class Application(BaseModel):
    banker: str
    submittedMessage : int
    valutate: str


class Countries(BaseModel):
    exchange_methods: Literal[
        'Курсы в мобильном приложении',
        'Курсы в интернет банке',
        'В отделении (наличные)',
        'В отделении (безналичные)',
        'Конвертация по картам'
    ]
    amount: int
    currency_in:str
    currency_out:str



