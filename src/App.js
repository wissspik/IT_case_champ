import './App.css';
import React, {useState} from "react";
import Header from './components/Header';


function App() {
    const [message, setMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!message.trim()) return;

        try {
            const response = await fetch("http://localhost:5000/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({message}),
            });

            if (!response.ok) {
                throw new Error("Ошибка при отправке сообщения");
            }

            const data = await response.json();
            alert(`Ответ сервера: ${data.response}`);

        } catch (error) {
            console.error("Ошибка:", error);
            alert("Не удалось отправить сообщение.");
        }
        event.preventDefault(); // Предотвращает перезагрузку страницы при отправке формы
        alert(`Что же ты написал ты написал: ${message}`);
    };

    return (
        <>
            <Header/>
            <div className={'App-main'}>
                <span className={'txt'}>Чем я могу помочь?</span>
                <div className={''}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                <input className={'forma'} type="text" value={message}
                                       onChange={(e) => setMessage(e.target.value)}
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