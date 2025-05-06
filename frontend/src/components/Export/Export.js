import CustomDropdown from "../CustomDropdown/CustomDropdown";

export default function Show({func, choose, val2}) {
    const country = {
        "array_countries": [
            "Узбекистан",
            "Киргизия",
            "Беларусь",
            "Таджикистан",
            "Абхазия",
            "Армения",
            "Южная Осетия",
            "Казахстан",
            "Азербайджан",
            "Китай",
            "Вьетнам",
            "Иран",
            "Сербия",
            "ОАЭ",
            "Израиль",
            "Грузия",
            "Кыргыpcтан",
            "Кипр",
            "Греция",
            "Корея (Республика)",
            "Турция",
            "Монголия",
            "Молдова",
            "Таиланд",
            "Приднестровье",
            "Индонезия",
            "Индия",
            "Филиппины"
        ],
        "array_picture": [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/60px-Flag_of_Uzbekistan.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/60px-Flag_of_Kyrgyzstan.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Belarus.svg/60px-Flag_of_Belarus.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Tajikistan.svg/60px-Flag_of_Tajikistan.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Flag_of_the_Republic_of_Abkhazia.svg/1920px-Flag_of_the_Republic_of_Abkhazia.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/60px-Flag_of_Armenia.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_South_Ossetia.svg/1920px-Flag_of_South_Ossetia.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/60px-Flag_of_Kazakhstan.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/60px-Flag_of_Azerbaijan.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/60px-Flag_of_the_People%27s_Republic_of_China.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/60px-Flag_of_Vietnam.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/60px-Flag_of_Iran.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/60px-Flag_of_Serbia.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/60px-Flag_of_the_United_Arab_Emirates.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/60px-Flag_of_Israel.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/60px-Flag_of_Georgia.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Cyprus.svg/60px-Flag_of_Cyprus.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/60px-Flag_of_Greece.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/60px-Flag_of_South_Korea.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/60px-Flag_of_Turkey.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/60px-Flag_of_Mongolia.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Moldova.svg/60px-Flag_of_Moldova.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/60px-Flag_of_Thailand.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Transnistria_%28state%29.svg/1920px-Flag_of_Transnistria_%28state%29.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/60px-Flag_of_Indonesia.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/60px-Flag_of_India.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/60px-Flag_of_the_Philippines.svg.png"
        ]
    }
    const banki = {
        "banks": [
            "Альфа-банк",
            "МТС банк",
            "Ozon банк",
            "ВТБ",
            "Газпромбанк",
            "Т-банк",
            "Почта Банк",
            "Россельхозбанк",
            "Сбербанк",
            "ЮMoney"
        ],
        "logos": [
            "https://upload.wikimedia.org/wikipedia/commons/8/87/Alfabank_logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/3/35/MTS-Bank.png",
            "https://upload.wikimedia.org/wikipedia/commons/f/f2/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_Ozon_%D0%B1%D0%B0%D0%BD%D0%BA.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/VTB_Logo_2018.svg",
            "https://upload.wikimedia.org/wikipedia/en/9/99/Gazprombank_en.svg",
            "https://upload.wikimedia.org/wikipedia/commons/1/17/T-Bank_RU_logo.svg",
            "https://logo.clearbit.com/pochtabank.ru?format=png",
            "https://upload.wikimedia.org/wikipedia/ru/5/51/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%A0%D0%BE%D1%81%D1%81%D0%B5%D0%BB%D1%8C%D1%85%D0%BE%D0%B7%D0%B1%D0%B0%D0%BD%D0%BA.svg",
            "https://logo.clearbit.com/sberbank.ru?format=png",
            "https://logo.clearbit.com/yoomoney.ru?format=png"
        ]
    }
    const valutes = {
        "array_currencies": [
            "UZS",
            "USD",
            "KGS",
            "BYN",
            "TJS",
            "RUB",
            "AMD",
            "KZT",
            "AZN",
            "CNY",
            "VND",
            "IRR",
            "RSD",
            "AED",
            "ILS",
            "GEL",
            "KGS",
            "EUR",
            "KRW",
            "TRY",
            "MNT",
            "MDL",
            "THB",
            "IDR",
            "INR",
            "PHP"
        ], "currency_names": [
            "Узбекский сом",
            "Американский доллар",
            "Киргизский сом",
            "Белорусский рубль",
            "Таджикский сомони",
            "Российский рубль",
            "Армянский драм",
            "Казахский тенге",
            "Азербайджанский манат",
            "Китайский юань",
            "Вьетнамский донг",
            "Иранский риал",
            "Сербский динар",
            "Дирхам ОАЭ",
            "Новый израильский шекель",
            "Грузинский лари",
            "Киргизский сом",
            "Евро",
            "Южнокорейская вона",
            "Турецкая лира",
            "Монгольский тугрик",
            "Молдавский лей",
            "Тайский бат",
            "Индонезийская рупия",
            "Индийская рупия",
            "Филиппинское песо"
        ]

    }
    const method = {
        'methods': ["KoronPay", "unistream", "IBAN", "mobile", "bank_card", "account number", "cash", "FN"],
        'methods_for_user': ["KoronPay", "Unistream", "IBAN", "По номеру телефона", "По номеру карты", "Номер счета", "Наличные", "По ФИО"]
    }
    const arcountry = country.array_countries
    const imgcountry = country.array_picture
    const valut = valutes.currency_names
    const methodi = method.methods_for_user
    return (
        <>
            {choose === 1 ?
                <CustomDropdown photos={imgcountry} placeholder={'Выбери страну'} onSelect={(val) => func(val)}
                                options={arcountry}/> : null}
            {choose === 0 ? <CustomDropdown photos={''} onSelect={(val) => func(val, val2)} options={methodi}
                                            placeholder={'Выбери метод'}/> : null}
            {choose === 2 ?
                <CustomDropdown photos={''} placeholder={'Выбери валюту'} onSelect={(val) => func(val)}
                                options={valut}/> : null}

        </>
    );
}