import React, {useState, useEffect} from "react";
import axios from "axios";
import Buttoni from "../Buttoni/Buttoni";
import Smska from "../Smska/Smska";
import Buttoniany from "../Buttoniany/Buttoniany";
import Export from "../Export/Export";
import ButtonsForAccept from "../ButtonsForAccept/ButtonsForAccept";
import TradeCurrency from "../TradeCurrency/TradeCurrency";
import './Dialog.css'

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
                        buttons={['Комиссия', 'Обмен валюты', 'Вклады']}
                        onClickHandler={[comissia, trade_valuta, vkladi]}
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

    const vkladi = () => {
        console.log('poka');
    };

    const trade_valuta = () => {
        setMessages(prev => [
            ...prev,
            {sender: 'user-message', text: 'Обмен валюты'},
            {
                sender: 'bot-message', component: (<TradeCurrency/>)
            },
            {
                sender: 'repeat-bot-message', component: (
                    <Buttoniany
                        first="Может теперь нужна помощь с чем-то другим?"
                        buttons={['Комиссия', 'Обмен валюты', 'Вклады']}
                        onClickHandler={[comissia, trade_valuta, vkladi]}
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
                        <p>Давайте полностью проверим информацию:</p>
                        <p>Валюта: {valutate}</p>
                        <p>Страна: {country}</p>
                        <p>Сумма: {summa}</p>
                        <p>Банк: {bankik}</p>
                        <button className="button" onClick={() => Sendtoback({valutate, summa, bank: bankik,country})}>
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
