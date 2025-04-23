import React, {useState} from 'react';
import './Grade.css';

const Grade = ({question, options, onVote}) => {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [input, setInput] = useState('');
    const [flag, setFlag] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        setInput('')
        setFlag(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selected !== null) {
            setSubmitted(true);
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
