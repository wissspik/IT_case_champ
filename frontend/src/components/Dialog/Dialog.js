import React, {useEffect, useState} from "react";
import axios from "axios";
import Buttoni from "../Buttoni/Buttoni";
import Smska from "../Smska/Smska";
import Buttoniany from "../Buttoniany/Buttoniany";
import Export from "../Export/Export";
import TradeCurrency from "../TradeCurrency/TradeCurrency";
import './Dialog.css'
import Deposit from "../Deposit/Deposit";
import Deposit2 from "../Deposit/Nakopschet";
import EqualButtons from "../EqualButtons";
import Table from "../Table/Table";
import Vkladi from "../Vkladi/Vkladi";

export default function Dialog({yourmessage}) {
    const [valutauser, setValutauser] = useState('')
    const [valutate, setValutate] = useState('');
    const [money, setMoney] = useState(false);
    const [counts, setCounts] = useState(false);
    const [message, setMessage] = useState('');
    const [banker, setBank] = useState('');
    const [messages, setMessages] = useState([]);
    const [method, setMethod] = useState('');
    const [input, setInput] = useState("");
    const [country, setCountry] = useState('');
    const ClearMessages = () => {
        setMessage('')
        setMessages([
            {
                sender: 'bot-message', component: (
                    <Buttoniany
                        first="👋 Пока, если нужна будет помощь, я тут"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />
                )
            }
        ]);
    }
    const currencyMap = {
        "Узбекский сом": "UZS",
        "Киргизский сом": "KGS",
        "Белорусский рубль": "BYN",
        "Таджикский сомони": "TJS",
        "Российский рубль": "RUB",
        "Армянский драм": "AMD",
        "Казахский тенге": "KZT",
        "Азербайджанский манат": "AZN",
        "Китайский юань": "CNY",
        "Вьетнамский донг": "VND",
        "Иранский риал": "IRR",
        "Сербский динар": "RSD",
        "Дирхам ОАЭ": "AED",
        "Новый израильский шекель": "ILS",
        "Грузинский лари": "GEL",
        "Евро": "EUR",
        "Южнокорейская вона": "KRW",
        "Турецкая лира": "TRY",
        "Монгольский тугрик": "MNT",
        "Молдавский лей": "MDL",
        "Тайский бат": "THB",
        "Индонезийская рупия": "IDR",
        "Индийская рупия": "INR",
        "Филиппинское песо": "PHP"
    };
    const paymentMethods = {
        "KoronPay": "KoronPay",
        "Unistream": "unistream",
        "IBAN": "IBAN",
        "По номеру телефона": "mobile",
        "По номеру карты": "bank_card",
        "Номер счета": "account number",
        "Наличные": "cash",
        "По ФИО": "FN"
    };
    const point = {
        Balance: 0,
        Plus: 0,
        Money: 0,
        Kopit: 0,
        Big: 0,
        Vozmozh: 0,
    }
    const pointnames = {
        Balance: 'В балансе',
        Plus: 'В плюсе',
        Money: 'Новые деньги',
        Kopit: 'Копить',
        Big: 'Большая Выгода',
        Vozmozh: 'Расширяй возможности',
    }

    const comissia = () => {
        setMessage('')
        console.log("comissia")
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: 'Рассчитай комиссию'},
            {
                sender: 'bot-message',
                component: (
                    <>
                        <p>💱 Выбери валюту</p>
                        <Export func={countries} choose={2}/>
                    </>
                ),
            },
        ]);
    };

    useEffect(() => {
        if (yourmessage) {
             setMessages([
            {sender: 'user-message', text: yourmessage},
            {
                sender: 'bot-message',
                component: (
                    <Buttoniany
                        first="👋 Привет, с чем конкретно тебе помочь?"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />
                ),
            },
        ]);

        } else {
            setMessages([
            {
                sender: 'bot-message',
                component: (
                    <Buttoniany
                        first="👋 Привет, с чем конкретно тебе помочь?"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />
                ),
            },
        ]);
        }

    }, []);
    const countries = (valu) => {
        setMessage('')
        setValutauser(valu)
        setValutate(currencyMap[valu]);
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: valu},
            {
                sender: 'bot-message', component: (
                    <>
                        <p>🌏 Выбери страну в которую хочешь сделать перевод</p>
                        <Export func={valuta} choose={1}/>
                    </>
                )
            }
        ]);
    }
    const vkladiandscheta = (info) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: info},
            {
                sender: 'bot-message', component: (
                    <Buttoniany
                        first={'🧐 Что тебя интересует '}
                        buttons={['💎 Накопительный счет', '📠 Вклады']}
                        onClickHandler={[nakopschet, vklad]}
                    />
                )
            }
        ])
    };
    const nakopschet = (text) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: text},
            {
                sender: 'bot-message', component: (
                    <>
                        <div className="promo-banner">
                            <h2>💼 Почему накопительный счет?</h2>
                            <p>
                                Накопительный счёт — надёжный инструмент для хранения и приумножения средств за счёт
                                стабильных процентов. Помогает сформировать «подушку безопасности», достичь финансовых
                                целей и спокойно планировать будущее. 🌙💸
                            </p>
                        </div>

                        <Buttoniany
                            first={''}
                            buttons={['🧩 Преимущества', '🎯 Помоги выбрать', '✨ Категории и счета', '🔙 Назад']}
                            onClickHandler={[nakopschetinfo, nakopshetchoose, nakopshetcategor, vkladiandscheta]}
                        />
                    </>

                )
            }
        ])
    }
    const nakopshetcategor = (info) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: info},
            {
                sender: 'bot-message', component: (
                    <>
                        <p>Все категории в нашем банке вы можете увидеть здесь 👉 </p>
                        <a href="https://www.gazprombank.ru/personal/increase/deposits/">Накопительные счета</a>
                    </>
                )
            },
            {
                sender: 'bot-message', component: (
                    <Buttoniany
                        first="👀 Может теперь нужна помощь с чем-то другим?"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />

                )
            }


        ])
    }
    const nakopshetchoose = (info) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: info},
            {
                sender: 'bot-message', component: (
                    <Buttoni first={'👀 Сколько денег вы хотите держать на счёте?'}
                             buttons={['😎 До 10 млн', '🤑 Свыше 10 млн']}
                             onClickHandler={nakopshetchoosestep2}
                    />
                )
            }
        ])
    }
    const nakopshetchoosestep2 = (choose) => {
        if (choose === '😎 До 10 млн') {
            setMoney(true)
        } else {
            setMoney(false)
        }
        console.log(choose)

        setMessages(prev => [...prev,
            {sender: 'user-message', text: choose},
            {
                sender: 'bot-message', component: (
                    <Buttoni
                        first={'👾 Будете ли вы часто снимать или пополнять счет?'}
                        buttons={['✔️ Да', '❌ Нет']}
                        onClickHandler={nakopshetchoosestep3}
                    />
                )
            }


        ])
    }
    const nakopshetchoosestep3 = (info) => {
        if (info === '✔️ Да') {
            setCounts(true)
        } else {
            setCounts(false)
        }
        console.log(info)
        setMessages(prev => [...prev,
            {sender: 'user-message', text: info},
            {
                sender: 'bot-message', component: (
                    <Buttoni first={'🤔 Что для вас важнее?'}
                             buttons={['Максимальная ставка (до 21,5 % годовых)', 'Простые условия (19,5 % без ограничения операций)']}
                             onClickHandler={nakopshetchoosestep4}
                    />
                )
            }

        ])

    }
    const nakopshetchoosestep4 = (info) => {
        console.log(money, counts)
        const sms = info === 'Максимальная ставка (до 21,5 % годовых)' ? 'Максимальная' : 'Простые условия'
        setMessages(prev => [...prev,
            {sender: 'user-message', text: sms},
        ])
        if (money && !counts && sms === 'Максимальная') {
            setMessages(prev => [...prev,
                {
                    sender: 'bot-message', component: (<>
                            <p>🤙 Вам подходит категория: Premium <br/> Полная информация 👉 <a
                                href="https://www.gazprombank.ru/personal/accounts/">Здесь</a></p>
                        </>

                    )
                },])
        }
        if (!money && !counts && sms === 'Максимальная') {
            setMessages(prev => [...prev,
                {
                    sender: 'bot-message', component: (<>
                            <p>🤙 Вам подходит категория: Накопительный счет <br/> Полная информация 👉 <a
                                href="https://www.gazprombank.ru/personal/accounts/">Здесь</a></p>
                        </>

                    )
                },])
        }
        if (counts && sms === 'Максимальная') {
            setMessages(prev => [...prev,
                {
                    sender: 'bot-message', component: (<>
                            <p>🤙 Вам подходит категория: Ежедневный процент <br/> Полная информация 👉 <a
                                href="https://www.gazprombank.ru/personal/accounts/">Здесь</a></p>
                        </>

                    )
                },])
        }
        if (sms === 'Простые условия') {
            setMessages(prev => [...prev,
                {
                    sender: 'bot-message', component: (<>
                            <p>🤙 Вам подходит категория: Простой процент <br/> Полная информация 👉 <a
                                href="https://www.gazprombank.ru/personal/accounts/">Здесь</a></p>
                        </>

                    )
                },])
        }
        setMessages(prev => [...prev,
            {
                sender: 'second-bot-message', component: (
                    <Buttoniany
                        first="👀 Может теперь нужна помощь с чем-то другим?"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />
                )
            }

        ])


    }
    const nakopschetinfo = (info) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: info},
            {
                sender: 'bot-message', component: (
                    <Deposit2/>
                )
            }, {
                sender: 'second-bot-message', component: (
                    <Buttoniany
                        first="👀 Может теперь нужна помощь с чем-то другим?"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />
                )
            }
        ])
    }
    const vklad = (text) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: text},
            {
                sender: 'bot-message', component: (
                    <>
                        <div className="promo-banner">
                            <h2>💼 Почему стоит открыть вклад?</h2>
                            <p>
                                <strong>Вклады</strong> помогают не только <strong>сохранить ваши сбережения в
                                безопасности</strong>,
                                но и <strong>приумножить</strong> их за счёт <strong>стабильных процентных
                                начислений</strong>.<br/>
                                Это <strong>надёжный способ планировать будущее</strong> и <strong>заставить деньги
                                работать на вас</strong> — даже во сне! 🌙💸
                            </p>
                        </div>
                        <Buttoniany
                            first={''}
                            buttons={['🎯 Помочь выбрать вклад', '📌 Категории', '✨ Преимущества', '🔙 Назад']}
                            onClickHandler={[helpchoosevklad, categories, privileges, vkladiandscheta]}
                        />
                    </>

                )
            }
        ])
    }
    const helpchoosevklad = (text) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: text},
            {
                sender: 'bot-message', component: (
                    <EqualButtons
                        first={'👍 Выбери валюту в которой будешь держать вклад'}
                        buttons={['Рубли', 'Юани']}
                        onClickHandler={currency}
                        value={['Рубли', 'Юани']}
                    />

                )
            }
        ])
    }
    const currency = (voted) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: voted},
        ])
        if (voted === 'Рубли') {
            point.Balance += 1
            point.Plus += 1
            point.Money += 1
            point.Kopit += 1
            point.Big += 1

        } else {
            point.Vozmozh += 1
        }
        setMessages(prev => [...prev,
            {
                sender: 'bot-message', component: (
                    <Buttoni
                        first={'😊 На какой срок вы планируете разместить средства?'}
                        buttons={['1 - 3 мес', '4 - 7 мес', '8 мес - 3 года']}
                        onClickHandler={times}
                    />
                )
            },

        ])


    }
    const times = (times) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: times},
        ])
        if (times === '1 - 3 мес' || times === '4 - 7 мес') {
            point.Balance += 1
            point.Money += 1
            point.Kopit += 1
            point.Plus += 1
        }
        setMessages(prev => [...prev,
            {
                sender: 'bot-message', component: (
                    <Buttoni
                        first={'🙂 Как вам удобнее получать проценты?'}
                        buttons={['Ежемесячно на счет / карту', 'В конце срока']}
                        onClickHandler={procents}
                    />
                )
            }
        ])
    }
    const procents = (procents) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: procents}
        ])
        if (procents === 'Ежемесячно на счет/карту') {
            point.Balance += 1
        } else {
            point.Plus += 1
            point.Money += 1
            point.Kopit += 1
            point.Big += 1
        }
        setMessages(prev => [...prev,
            {
                sender: 'bot-message', component: (
                    <>
                        <div className="promo-banner">
                            <h2>💼 Готовы ли вы выполнить какие-либо условия, чтобы получить надбавку к базовой
                                ставке?</h2>
                            <p>
                                1)Никаких условий, только максимальная фиксированная ставка <br/>
                                2)Поддерживать средний остаток на дебетовой карте <br/>
                                3)Подключить опцию «Накопления» в сервисе «Газпром Бонус» <br/>
                                4)Внести «новые деньги» (не было 30 дней на ваших счетах) <br/>
                                5)Открыть дистанционно и быть новым/зарплатным/пенсионным клиентом! ✍️👾
                            </p>
                        </div>
                        <Buttoni first={''}
                                 buttons={['1', '2', '3', '4', '5']}
                                 onClickHandler={ysl}
                        />
                    </>


                )
            }
        ])
    }
    const ysl = (vote) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: vote}
        ]);

        if (vote === '1') {
            point.Big += 1;
        } else if (vote === '2') {
            point.Balance += 1;
        } else if (vote === '3') {
            point.Plus += 1;
        } else if (vote === '4') {
            point.Money += 1;
        } else {
            point.Kopit += 1;
        }

        const maxValue = Math.max(...Object.values(point));

        const itog = [];
        for (const key in point) {
            if (point[key] === maxValue) {
                itog.push(key);
            }
        }

        const user_itog = itog.map(key => pointnames[key]);

        console.log('😉 Результат:', user_itog);
        setMessages(prev => [...prev,
            {
                sender: 'bot-message', component: (
                    <>

                        {user_itog.map((key, itogi) => (
                            <>
                                <p>🤝 Тебе подходят такие вклады как: {key}</p>
                                {key === 'Копить' ? <Vkladi choose={5}/> : null}
                                {key === 'Расширяй возможности' ? <Vkladi choose={4}/> : null}
                                {key === 'Новые деньги' ? <Vkladi choose={3}/> : null}
                                {key === 'В балансе' ? <Vkladi choose={2}/> : null}
                                {key === 'В плюсе' ? <Vkladi choose={1}/> : null}
                            </>
                        ))
                        }

                        <p>Полную информацию о нем можете узнать <a
                            href="https://www.gazprombank.ru/personal/increase/deposits/">здесь</a></p>
                    </>
                )
            }, {
                sender: 'second-bot-message', component: (
                    <Buttoniany
                        first="👀 Может теперь нужна помощь с чем-то другим?"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />
                )
            }


        ])
    };

    const categories = (text) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: text},
            {
                sender: 'bot-message', component: (
                    <>
                        <p>Все категории в нашем банке вы можете увидеть 👉 <a
                            href="https://www.gazprombank.ru/personal/increase/deposits/">Здесь</a>
                        </p>

                    </>

                )
            }, {
                sender: 'second-bot-message', component: (
                    <Buttoniany
                        first="👀 Может теперь нужна помощь с чем-то другим?"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />

                )
            }
        ])
    }
    const privileges = (text) => {
        setMessages(prev => {
            return [
                ...prev,
                {sender: 'user-message', text},
                {
                    sender: 'bot-message',
                    component: (
                        <>
                            <Deposit/>
                        </>
                    )
                }, {
                    sender: 'second-bot-message', component: (
                        <Buttoniany
                            first="👀 Может теперь нужна помощь с чем-то другим?"
                            buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                            onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                        />
                    )
                }
            ];
        });
    };


    const trade_valuta = () => {
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: 'Обмен валюты'},
            {
                sender: 'change-moneta', component: (<TradeCurrency/>)
            },
            {
                sender: 'second-bot-message', component: (
                    <Buttoniany
                        first="👀 Может теперь нужна помощь с чем-то другим?"
                        buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />
                )
            }
        ]);
    };

    const valuta = (country) => {
        setCountry(country)
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: country},
            {sender: 'bot-message', text: '✍️ Напиши сумму которую ты хочешь перевести'},
        ]);
    };

    const Sendtoback = async (data) => {
        console.log(data.method)
        console.log(valutate, data.currency)
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/commission/сommision_calculation",
                {
                    currency: data.currency,
                    country: data.country,
                    method: data.method,
                    amount: Number(data.amount)
                },
                {
                    headers: {"Content-Type": "application/json"},
                }
            );

            console.log("Успешный ответ от сервера:", response.data);

            setMessages(prev => [...prev,
                {sender: 'user-message', text: 'Все верно'},

                {
                    sender: 'Tabler', component: (
                        <Table data={response.data}/>
                    )
                }, {
                    sender: 'second-bot-message', component: (
                        <Buttoniany
                            first="👀 Может теперь нужна помощь с чем-то другим?"
                            buttons={['💸 Комиссия', '💱 Обмен валюты', '🏦 Вклады и счета']}
                            onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                        />
                    )
                }
            ]);

        } catch (error) {
            console.error("Ошибка 422:", error.response?.data || error.message);
            setMessages(prev => [...prev,
                {
                    sender: 'second-bot-message',
                    text: `🚨 Ошибка при расчете комиссии`
                },
                {
                    sender: 'second-bot-message', component: (
                        <>
                            <p>💱 Выбери валюту</p>
                            <Export func={countries} choose={2}/>
                        </>

                    )
                }
            ]);
        }
    };


    const Back = () => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: 'Заполнить заново'}
        ])
        setBank('')
        setCountry('')
        setValutate('')
        setMessage('')
        comissia()

    }

    const bank = (bankik, summa) => {
        setMethod(paymentMethods[bankik]);
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: bankik},
            {
                sender: 'bot-message',
                component: (
                    <>
                        <h3>✅ Информация о переводе</h3>
                        <p>💵 Валюта: {valutauser}</p>
                        <p>🌍 Страна: {country}</p>
                        <p>💰 Сумма: {summa}</p>
                        <p> 🏦 Метод: {bankik}</p>
                        <button className="button" onClick={() => Sendtoback({
                            currency: valutate,
                            amount: summa,
                            method: paymentMethods[bankik],
                            country: country
                        })}>
                            Все верно
                        </button>
                        <button className={'button'} onClick={Back}>Заполнить
                            заново
                        </button>
                    </>

                ),
            },
        ]);
    };
    const bankers = (msg) => {
        setMessages(prev => [
            ...prev,
            {
                sender: 'bot-message',
                component: (
                    <>
                        <p>💳 Выбери метод для перевода </p>
                        <Export func={bank} choose={0} val2={msg}/>
                    </>
                ),
            },
        ]);
    }
    const handleSend = (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        setMessages(prev => [...prev, {sender: 'user-message', text: trimmed}]);
        if (valutate && !message) {
            const msg = trimmed;
            if (!isNaN(msg) && isFinite(msg) && Number(msg) > 10 && Number(msg) < 1000000000 && country && msg[0] !== '0') {
                if (valutate && !message) {
                    setMessage(msg);
                    bankers(msg)
                }
            } else {
                setMessages(prev => [
                    ...prev,
                    {sender: 'bot-message', text: '😞 Ты ввел неверное число, попробуй еще раз'},
                ]);
            }
        } else {
            setMessages(prev => {
                const lastComponent = [...prev].reverse().find(m => m.component)?.component;
                return [
                    ...prev,
                    {sender: 'bot-message', text: '😩 Прости, пока затрудняюсь ответить на твой вопрос'},
                    lastComponent && {sender: 'second-bot-message', component: lastComponent}
                ].filter(Boolean);
            });
        }
        setInput("");
    };
    return (
        <div>
            <Smska
                input={input}
                handleSend={handleSend}
                setInput={setInput}
                messages={messages}
                clear={ClearMessages}
            />
        </div>
    );
}