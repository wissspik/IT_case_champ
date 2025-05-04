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
    currency : Literal["UZS", "KGS", "BYN","TJS", "RUB", "AMD", "KZT", "AZN", "CNY", "VND", "IRR", "RSD", "AED", "ILS", "GEL", "KGS", "EUR", "KRW", "TRY", "MNT", "MDL", "THB", "IDR", "INR", "PHP"]
    country: Literal["Узбекистан", "Киргизия", "Беларусь", "Таджикистан",  "Абхазия", "Армения", "Южная Осетия", "Казахстан", "Азербайджан", "Китай",  "Вьетнам", "Иран", "Сербия", "ОАЭ", "Израиль", "Грузия", "Кыргыpcтан", "Кипр", "Греция", "Корея (Республика)", "Турция", "Монголия", "Молдова", "Таиланд", "Приднестровье", "Индонезия", "Индия", "Филиппины"]
    method: Literal['cash','bank_card','FN','phone_number','account number']
    amount : condecimal(max_digits=12, decimal_places=2,ge=0)
