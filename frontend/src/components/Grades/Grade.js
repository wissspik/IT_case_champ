import React, {useState} from 'react';
import './Grade.css';
import axios from "axios";

const Grade = ({question, options, onVote}) => {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [input, setInput] = useState('');
    const [flag, setFlag] = useState(false);
    const [voted, setVoted] = useState('');
    const [comment, setComment] = useState('');
    const Sendtoback = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/", data, {
                    headers: {"Content-Type": "application/json"},
                })
            ;
            console.log("Успешный ответ и данные отправлены", response.data);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        setComment(input)
        setInput('')
        setFlag(true)
        Sendtoback({comment,selected})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selected !== null) {
            setSubmitted(true);
            setVoted(selected);
            onVote(selected);
        }
    };

    return (
        <div className="mini-poll">
            <h3>{question}</h3>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    {options.map((opt, idx) => (
                        <label key={idx} className="poll-option">
                            <input
                                type="radio"
                                name="poll"
                                value={idx}
                                onChange={() => setSelected(idx)}
                            />
                            {opt}
                        </label>
                    ))}
                    <button type="submit" className="poll-button">Голосовать</button>
                </form>
            ) : (<>
                    <p className="poll-thanks">Спасибо за ваш голос!</p>
                    {!flag ? (
                        <>
                            <p className="poll-thanks">Оставь комментарий </p>
                            <form onSubmit={submit}>
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>

                            </form>
                        </> ) : <p className={'poll-thanks'}> Спасибо за ваш комментарий! </p>
                    }
                </>
            )}
        </div>
    );
};

export default Grade;
