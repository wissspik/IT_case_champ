import React, {useState} from 'react'
import Soobchenie from "./Soobchenie";
import axios from "axios";
import Buttoni from "./Buttoni"

export default function Dialog({yourmessage}) {
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(false);
    const [valutate, setValutate] = useState('');
    const [banker, setBank] = useState('');
    const [message, setMessage] = useState('');
    const [submittedMessage, setSubmittedMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmittedMessage(message);
        setMessage('');
    };

    function comissia(text) {
        if (flag) {
            console.log('Уже нажато');
        } else {
            setFlag(true);
        }
    }

    function valuta(valida) {
        if (flag2) {
            console.log('Uses');
        } else {
            setValutate(valida);
            setFlag2(true);
        }
    }

    function bank(bankik) {
        if (flag3) {
            console.log('Bank');
        } else {
            setBank(bankik)
            setFlag3(true);
        }
    }

    const Sendtoback = async () => {
        const data = {
            valutate, banker, submittedMessage
        };
        try {
            const response = await axios.post("http://127.0.0.1:8000/", data, {
                headers: {"Content-Type": "application/json"}
            });

            console.log("Успешный ответ:", response.data);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    }

    return (
        <>
            <div className={'chat-container'}>
                <Soobchenie message={message} setMessage={setMessage} handleSubmit={handleSubmit}/>
                <div className={'user'}>
                    <p>{yourmessage}</p>
                </div>
                <Buttoni
                    first="Привет дорогой пользователь ты очень крут"
                    buttons={["Комиссия", "Обмен валюты", "Че-то еще"]}
                    onClickHandler={comissia}
                />
                {flag ? <>
                        <div className={'user'}>Рассчитай комиссию</div>
                        <Buttoni
                            first="Выбери валюту"
                            buttons={["Рубли", "Евро", "Доллары"]}
                            onClickHandler={valuta}
                        />
                        {flag2 ? <>
                                <div className={'user'}>{valutate}</div>
                                <div className={'bot'}>Напиши сумму которую ты хочешь перевести</div>
                                <div className={'user'}>{submittedMessage}</div>
                                {submittedMessage.trim() ?
                                    <>
                                        {!isNaN(submittedMessage) && isFinite(submittedMessage) && Number(submittedMessage) > 0 ?
                                            <Buttoni
                                                first="Выбери банк"
                                                buttons={["Сбербанк", "Т-банк", "Совкомбанк"]}
                                                onClickHandler={bank}
                                            />
                                            : <div className="bot">
                                                <span>Ты ввел неверное число</span>
                                            </div>
                                        }
                                    </>
                                    : null
                                }
                                {flag3 ?
                                    <>
                                        <div className={'user'}>{banker}</div>
                                        <div className={'bot'}>
                                            <p>Давайте полностью проверим информацию</p>
                                            <p>Валюта : {valutate} </p>
                                            <p>Сумма : {submittedMessage}</p>
                                            <p>Банк: {banker} </p>
                                            <button className={'button'} onClick={Sendtoback}>Все верно</button>
                                        </div>
                                    </>
                                    : null
                                }
                            </>
                            : null}
                    </>
                    : null}
            </div>
        </>


    )
}