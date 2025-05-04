from fastapi import APIRouter
from sqlalchemy import select,func
from backend.database.base import SessionDep
from backend.shapes.shapes import BankCommissions
from backend.database.models import BankSistem
from decimal import Decimal

app = APIRouter()

@app.post("/take_countries",
    summary="Получение списка стран,а также png флагов для них")
async def take_countries():
    '''
    Возвращает данные о странах и их флагах.

    Returns:
        dict: Словарь с двумя ключами:
            - 'array_countries': array строк с названиями стран
            - 'array_picture': array строк с URL-адресами PNG-флагов
    '''
    array_countries = ("Узбекистан", "Киргизия", "Беларусь", "Таджикистан",  "Абхазия", "Армения", "Южная Осетия", "Казахстан", "Азербайджан", "Китай",  "Вьетнам", "Иран", "Сербия", "ОАЭ", "Израиль", "Грузия", "Кыргыpcтан", "Кипр", "Греция", "Корея (Республика)", "Турция", "Монголия", "Молдова", "Таиланд", "Приднестровье", "Индонезия", "Индия", "Филиппины")
    array_picture = ("https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/60px-Flag_of_Uzbekistan.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/60px-Flag_of_Kyrgyzstan.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Belarus.svg/60px-Flag_of_Belarus.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Tajikistan.svg/60px-Flag_of_Tajikistan.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Flag_of_the_Republic_of_Abkhazia.svg/1920px-Flag_of_the_Republic_of_Abkhazia.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/60px-Flag_of_Armenia.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_South_Ossetia.svg/1920px-Flag_of_South_Ossetia.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/60px-Flag_of_Kazakhstan.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/60px-Flag_of_Azerbaijan.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/60px-Flag_of_the_People%27s_Republic_of_China.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/60px-Flag_of_Vietnam.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/60px-Flag_of_Iran.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/60px-Flag_of_Serbia.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/60px-Flag_of_the_United_Arab_Emirates.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/60px-Flag_of_Israel.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/60px-Flag_of_Georgia.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Cyprus.svg/60px-Flag_of_Cyprus.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/60px-Flag_of_Greece.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/60px-Flag_of_South_Korea.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/60px-Flag_of_Turkey.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/60px-Flag_of_Mongolia.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Moldova.svg/60px-Flag_of_Moldova.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/60px-Flag_of_Thailand.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Transnistria_%28state%29.svg/1920px-Flag_of_Transnistria_%28state%29.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/60px-Flag_of_Indonesia.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/60px-Flag_of_India.svg.png","https://www.pngall.com/wp-content/uploads/15/Philippine-Flag-PNG-Photos.png")
    return {'array_countries': array_countries, 'array_picture': array_picture}

@app.post("/take_currencies",
          summary="Получение списка валют")
async def take_currencies():
    '''
        Возвращает данные о валютах.

        Returns:
            dict: Словарь с ключом:
                - 'array_currencies': tuple строк с названиями стран
    '''
    array_currencies = ("UZS", "KGS", "BYN", "TJS", "RUB", "AMD", "KZT", "AZN", "CNY", "VND", "IRR", "RSD", "AED", "ILS", "GEL", "KGS", "EUR", "KRW", "TRY", "MNT", "MDL", "THB", "IDR", "INR", "PHP")
    currency_names = ("Узбекский сом", "Киргизский сом", "Белорусский рубль", "Таджикский сомони", "Российский рубль", "Армянский драм", "Казахский тенге", "Азербайджанский манат", "Китайский юань", "Вьетнамский донг", "Иранский риал", "Сербский динар", "Дирхам ОАЭ", "Новый израильский шекель", "Грузинский лари", "Киргизский сом", "Евро", "Южнокорейская вона", "Турецкая лира", "Монгольский тугрик", "Молдавский лей", "Тайский бат", "Индонезийская рупия", "Индийская рупия", "Филиппинское песо")
    return {"array_currencies": array_currencies,'currency_names':currency_names}
@app.post("/сommision_calculation",
          summary="Высчитывание самой вышгодной комиссии")
async def calculation_сommissions(data:BankCommissions ,session: SessionDep):
    '''
           Возвращает комиссию по переводам для банков.

           Args:
               session (SessionDep): Зависимость FastAPI для работы с сессией.
               data (BankCommissions):  Входной JSON с данными.

           Returns:
               dict: Словарь с массивами,которые содержат:
                    -bank: Названия банка.
                    -country: Название страны.
                    -method: Название способа перевода.
                    -currency: Название валюта для перевода.
                    -commission: Сумма комиссии по переводу.
                    -limit_min: Минимальная сумма перевода.
                    -limit_max: Максимальная сумма перевода.
                    -comments: Дополнительные комментарии для перевода.
                    -amount: Сумма перевода с учетом комиссии.
    '''
    all_banks = ["Альфа-банк", "МТС банк", "Ozon банк", "ВТБ", "Газпромбанк", "Т-банк", "Почта Банк", "Россельхозбанк", "Сбербанк", "ЮMoney"]
    subq = (
        select(
            BankSistem,
            func.row_number()
            .over(
                partition_by=BankSistem.bank,
                order_by=BankSistem.commission
            )
            .label("rn")
        )
        .where(
            BankSistem.bank.in_(all_banks),
            BankSistem.currency == data.currency,
            BankSistem.country == data.country,
            BankSistem.method == data.method,
            BankSistem.limit_min <= data.amount,
            data.amount <= BankSistem.limit_max
        )
        .subquery()
    )
    stmt = select(subq).where(subq.c.rn == 1)
    result = await session.execute(stmt)
    best_per_bank = result.all()

    rows_data = [
        {   "bank":best_per_bank[r][1],
            "country": best_per_bank[r][2],
            "method": best_per_bank[r][3],
            "currency": best_per_bank[r][4],
            "commission": best_per_bank[r][5],
            "limit_min":best_per_bank[r][6],
            "limit_max":best_per_bank[r][7],
            "comments": best_per_bank[r][8],
            "amount": Decimal(str(data.amount)) * (Decimal('100') - Decimal(str(best_per_bank[r][5]))) / Decimal('100')
        }
        for r in range(len(best_per_bank))
    ]
    rows_data.sort(key=lambda x: x["commission"]) # сортируем массив JSON-ов по commission
    return rows_data

