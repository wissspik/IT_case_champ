import React, {useState} from 'react'
import Soobchenie from "./Soobchenie";
import axios from "axios";

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

    function comissia() {
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
                <div className={'bot'}>
                    <p>Привет дорогой пользователь ты очень крут <br/> пожалуйста выбери одну из этих кнопочек</p>
                    <button className={'button'} onClick={comissia}>Коммисия</button>
                    <button className={'button'}>Обмен валюты</button>
                    <button className={'button'}>Че то еще</button>
                </div>
                {flag ? <>
                        <div className={'user'}>Рассчитай комиссию</div>
                        <div className={'bot'}>
                            <p>Выбери валюту</p>
                            <button className={'button'} onClick={() => valuta('Рубли')}>Рубли</button>
                            <button className={'button'} onClick={() => valuta('Евро')}>Евро</button>
                            <button className={'button'} onClick={() => valuta('Доллары')}>Доллары</button>


                        </div>

                    </>
                    : null}
                {flag2 ? <>
                        <div className={'user'}>{valutate}</div>
                        <div className={'bot'}>Напиши сумму которую ты хочешь перевести</div>
                        <div className={'user'}>{submittedMessage}</div>
                    </>
                    : null}
                {submittedMessage.trim() ?
                    <>
                        {!isNaN(submittedMessage) && isFinite(submittedMessage) ?
                            <>
                                <div className={'bot'}>
                                    <p>Выбери банк</p>
                                    <button className={'button'} onClick={() => bank('Сбербанк')}>Сбербанк</button>
                                    <button className={'button'} onClick={() => bank('Т-банк')}>Т-банк</button>
                                    <button className={'button'} onClick={() => bank('Совкомбанк')}>Совкомбанк</button>
                                </div>
                            </>
                            : <div className="bot">
                                <span>Ты ввел не число</span>
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
                            <p>Валюта :{valutate} </p>
                            <p>Сумма :{submittedMessage}</p>
                            <p>Банк: {banker} </p>
                            <button className={'button'} onClick={Sendtoback}>Все верно</button>
                        </div>
                    </> : null
                }

            </div>


        </>


    )
}