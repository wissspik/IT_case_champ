import React, { useState } from 'react';
import './Grade.css';
import axios from 'axios';

const Grade = ({ question, options, onVote }) => {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [input, setInput] = useState('');
    const [commentSent, setCommentSent] = useState(false);

    const sendToBackend = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/", data, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Данные отправлены успешно:", response.data);
        } catch (error) {
            console.error("Ошибка при отправке:", error);
        }
    };

    const handleVoteSubmit = (e) => {
        e.preventDefault();
        if (selected !== null) {
            setSubmitted(true);
            onVote(selected);
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        sendToBackend({ comment: input, selected });
        setInput('');
        setCommentSent(true);
    };

    return (
        <div className="mini-poll">
            <h3>{question}</h3>
            {!submitted ? (
                <form onSubmit={handleVoteSubmit} className="poll-form">
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
            ) : (
                <>
                    <p className="poll-thanks">✅ Спасибо за ваш голос!</p>
                    {!commentSent ? (
                        <form onSubmit={handleCommentSubmit} className="comment-form">
                            <label htmlFor="comment">💬 Оставьте комментарий:</label>
                            <input
                                type="text"
                                id="comment"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ваш комментарий..."
                                className="comment-input"
                            />
                            <button type="submit" className="poll-button secondary">Отправить</button>
                        </form>
                    ) : (
                        <p className="poll-thanks">🎉 Спасибо за ваш комментарий!</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Grade;
