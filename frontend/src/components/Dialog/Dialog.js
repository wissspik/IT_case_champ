import React, {useState, useEffect} from "react";
import axios from "axios";
import Buttoni from "../Buttoni/Buttoni";
import Smska from "../Smska/Smska";
import Buttoniany from "../Buttoniany/Buttoniany";
import Export from "../Export/Export";
import ButtonsForAccept from "../ButtonsForAccept/ButtonsForAccept";
import TradeCurrency from "../TradeCurrency/TradeCurrency";
import './Dialog.css'
import Deposit from "../Deposit/Deposit";

export default function Dialog({yourmessage}) {
    const [valutate, setValutate] = useState('');
    const [message, setMessage] = useState('');
    const [banker, setBank] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [country, setCountry] = useState('');

    const comissia = () => {
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: 'Рассчитай комиссию'},
            {
                sender: 'bot-message',
                component: (
                    <Buttoni
                        first="Выбери валюту"
                        buttons={['Рубли', 'Евро', 'Доллары']}
                        onClickHandler={countries}
                    />
                ),
            },
        ]);
    };

    useEffect(() => {
        setMessages([
            {sender: 'user-message', text: yourmessage},
            {
                sender: 'bot-message',
                component: (
                    <Buttoniany
                        first="Привет, с чем конкретно тебе помочь?"
                        buttons={['Комиссия', 'Обмен валюты', 'Вклады и счета']}
                        onClickHandler={[comissia, trade_valuta, vkladiandscheta]}
                    />
                ),
            },
        ]);
    }, []);
    const countries = (valu) => {
        setValutate(valu);
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: valu},
            {
                sender: 'repeat-bot-message', component: (
                    <>
                        <p>Выбери страну в которую хочешь сделать перевод</p>
                        <Export func={valuta}/>
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
                        first={'Что тебя интересует '}
                        buttons={['Накопительный счет', 'Вклады']}
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
                    <Buttoniany
                        first={'Что тебя интересует '}
                        buttons={['Информация', 'Назад']}
                        onClickHandler={[nakopschetinfo, vkladiandscheta]}
                    />
                )
            }
        ])
    }
    const nakopschetinfo = (info) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: info},
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
                            buttons={['Помочь выбрать вклад', 'Категории', 'Преимущества']}
                            onClickHandler={[helpchoosevklad, categories, privileges]}
                        />
                    </>

                )
            }
        ])
    }
    const helpchoosevklad = (text) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: text},
        ])
    }
    const categories = (text) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: text},
            {
                sender: 'bot-message', component: (
                    <>
                        <p>Все категории в нашем банке вы можете увидеть по ссылке </p>
                        <a href="https://www.gazprombank.ru/personal/increase/deposits/">https://www.gazprombank.ru/personal/increase/deposits/</a>
                    </>

                )
            }
        ])
    }
    const privileges = (text) => {
        setMessages(prev => [...prev,
            {sender: 'user-message', text: text},
            {
                sender: 'bot-message', component: (
                    <Deposit/>
                )
            }
        ])
    }

    const trade_valuta = () => {
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: 'Обмен валюты'},
            {
                sender: 'change-moneta', component: (<TradeCurrency/>)
            },
            {
                sender: 'repeat-bot-message', component: (
                    <Buttoniany
                        first="Может теперь нужна помощь с чем-то другим?"
                        buttons={['Комиссия', 'Обмен валюты', 'Вклады']}
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
            {sender: 'bot-message', text: 'Напиши сумму которую ты хочешь перевести'},
        ]);
    };

    const Sendtoback = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/", data, {
                    headers: {"Content-Type": "application/json"},
                })

            ;
            setMessages(prev => [...prev, {
                sender: 'bot-message', component: (
                    <>
                        <p>Ваша комиссия составит: undefined </p>
                    </>
                )
            }])
            console.log("Успешный ответ и данные отправлены", response.data);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const bank = (bankik, summa) => {
        setBank(bankik);
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: bankik},
            {
                sender: 'bot-message',
                component: (
                    <>
                        <h3>✅ Информация о переводе</h3>
                        <p>💵 Валюта: {valutate}</p>
                        <p>🌍 Страна: {country}</p>
                        <p>💰 Сумма: {summa}</p>
                        <p> 🏦 Банк: {bankik}</p>
                        <button className="button" onClick={() => Sendtoback({valutate, summa, bank: bankik, country})}>
                            Все верно
                        </button>
                    </>

                ),
            },
        ]);
    };
    const handleSend = (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        setMessages(prev => [...prev, {sender: 'user-message', text: trimmed}]);
        if (valutate && !message) {
            const msg = trimmed;
            if (!isNaN(msg) && isFinite(msg) && Number(msg) > 0) {
                if (valutate && !message) {
                    setMessage(msg);
                    setMessages(prev => [
                        ...prev,
                        {
                            sender: 'bot-message',
                            component: (
                                <ButtonsForAccept
                                    first={'Выбери банк'}
                                    buttons={['Сбербанк', 'Т-банк', 'Совкомбанк']}
                                    onClickHandler={bank}
                                    sums={msg}
                                />
                            ),
                        },
                    ]);
                }
            } else {
                setMessages(prev => [
                    ...prev,
                    {sender: 'bot-message', text: 'Ты ввел неверное число'},
                ]);
            }
        }
        setInput("");
    };
    return (
        <>
            <Smska
                input={input}
                handleSend={handleSend}
                setInput={setInput}
                messages={messages}
            />
            <button

                onClick={() =>
                    window.location.reload()}
                className="button-cleaning"
            >
                Очистить чат
            </button>
        </>
    );
}
