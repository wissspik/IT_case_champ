import './App.css';
import React, {useState} from "react";
import Header from './components/Header';


function App() {
    const [message, setMessage] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращает перезагрузку страницы при отправке формы
        alert(`Чо ты написал: ${message}`);
    };
    return (
        <>
            <Header/>
            <div className={'App-main text-center'}>
                <span>Чем я могу помочь?</span>
                <div className={''}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                <input className={'forma'} type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                                       placeholder={'Введите ваше сообщение'}
                                />
                            </label>

                        </div>
                    </form>

                </div>

            </div>

        </>


    );
}

export default App;
