import React, {useState, useEffect} from "react";
import axios from "axios";
import Buttoni from "./Buttoni";
import Smska from "./Smska";
import Buttoniany from "./Buttoniany";
import Export from "./Export";
import ButtonsForAccept from "./ButtonsForAccept";

export default function Dialog({yourmessage}) {
    const [valutate, setValutate] = useState('');
    const [message, setMessage] = useState('');
    const [banker, setBank] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [country, setCountry] = useState('');
    const [currency, setCurrency] = useState('');
    const [currency2, setCurrency2] = useState('');
    const comissia = () => {
        setMessages(prev => [
            ...prev,
            {sender: 'user', text: 'Рассчитай комиссию'},
            {
                sender: 'bot',
                component: (
                    <Buttoni
                        first="Выбери валюту"
                        buttons={['Рубли', 'Евро', 'Доллары']}
                        onClickHandler={valuta}
                    />
                ),
            },
        ]);
    };
    useEffect(() => {
        setMessages([
            {sender: 'user', text: yourmessage},
            {
                sender: 'bot',
                component: (
                    <Buttoniany
                        first="Привет, с чем конкретно тебе помочь?"
                        buttons={['Комиссия', 'Обмен валюты', 'Вклады']}
                        onClickHandler={[comissia, trade_valuta, vkladi]}
                    />
                ),
            },
        ])
    }, []);
    const countries = () => {
        setMessages(prev => [...prev,
            {sender: 'bot', text: 'Выбери страну в которую хочешь сделать перевод'},
            {
                sender: 'bot2', component: (<>
                        <Export/>
                        <button className={'button'} onClick={valuta}>Подтвердить</button>
                    </>
                )
            }
        ])


    }
    const vkladi = () => {
        console.log('poka')
    }

    const trade_valuta = () => {
        setMessages(prev => [...prev,
            {sender: 'user', text: 'Обмен валюты'},
            {
                sender: 'bot', component: (<Buttoni
                    first="Выбери валюту для обмена"
                    buttons={['Рубли', 'Евро', 'Доллары']}
                    onClickHandler={trade_valuta_user}
                />)
            }

        ])
    }
    const trade_valuta_user = (choose) => {
        setCurrency(choose);
        setMessages(prev => [...prev,
            {sender: 'user', text: choose},
            {
                sender: 'bot', component: (
                    (<Buttoni
                        first="Выбери в какую валюту ты хочешь конвертировать"
                        buttons={['Рубли', 'Евро', 'Доллары']}
                        onClickHandler={trade_valuta_bot}
                    />)

                )
            }
        ])
    }
    const trade_valuta_bot = (choose) => {
        setCurrency2(choose);
        setMessages(prev => [...prev,
            {sender: 'user', text: choose},
            {sender: 'bot', text: 'Введи сумму которую хочешь перевести'}

        ])
    }

    const valuta = (val) => {
        setValutate(val);
        setMessages(prev => [
            ...prev,
            {sender: 'user', text: val},
            {sender: 'bot', text: 'Напиши сумму которую ты хочешь перевести'},
        ]);
    };

    const Sendtoback = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/", data, {
                headers: {"Content-Type": "application/json"},
            });
            console.log("Успешный ответ и данные отправлены", response.data);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const bank = (bankik, summa) => {
        setBank(bankik);
        setMessages(prev => [
            ...prev,
            {sender: 'user', text: bankik},
            {
                sender: 'bot',
                text:
                    `Давайте полностью проверим информацию:\n` +
                    `Валюта: ${valutate}\n` +
                    `Сумма: ${summa} ${valutate}\n` +
                    `Банк: ${bankik}`,
            },
            {
                sender: 'bot2',
                component: (
                    <button className="button" onClick={() => Sendtoback({ valutate, summa, bank: bankik })}>
                        Все верно
                    </button>
                ),
            },
        ]);
    };

    const handleSend = (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        setMessages(prev => [...prev, {sender: 'user', text: trimmed}]);

        if ((valutate && !message) || (currency && currency2)) {
            const msg = trimmed;
            if (!isNaN(msg) && isFinite(msg) && Number(msg) > 0) {
                if (valutate && !message) {
                    setMessage(msg)
                    setMessages(prev => [
                        ...prev,
                        {
                            sender: 'bot',
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

                } else {
                    setMessages(prev => [...prev,
                        {
                            sender: 'bot',
                            text:
                                `Давайте полностью проверим информацию:\n` +
                                `Валюта из : ${currency}\n` +
                                `Валюта в : ${currency2}\n` +
                                `Сумма: ${msg}`,
                        },
                        {
                            sender: 'bot2',
                            component: (
                                <button className="button" onClick={() => Sendtoback({ currency, currency2, bank: msg })}>
                                    Все верно
                                </button>
                            ),
                        },

                    ])
                }

            } else {
                setMessages(prev => [
                    ...prev,
                    {sender: 'bot', text: 'Ты ввел неверное число'},
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
                onClick={() => window.location.reload()}
                className="cleaning"
            >
                Очистить чат
            </button>
        </>
    );
}