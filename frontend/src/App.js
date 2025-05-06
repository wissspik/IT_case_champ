import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Start from './components/Start/Start';
import Dialog from './components/Dialog/Dialog';
import FinanceTip from "./components/FinanceTip/FinanceTip";
import FaqTip from "./components/Faq/Faq";
import Grade from './components/Grades/Grade';

function HomePage({ message, setMessage, handleSubmit }) {
    return (
        <div className={'fade-in'}>
            <div
                style={{
                    backgroundImage: "url('/img/background.png')",
                    height: '100vh',
                }}
            >
                <Start message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}

function ChatPage({ submittedMessage }) {
    return (
        <div style={{
            backgroundImage: "url('/img/backk.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
        }}>
            <div className={'row1'}>
                <FinanceTip />
                <a href="https://www.gazprombank.ru/personal/increase/deposits/">
                    <img className={'img-finance'} src="/img/Group21.png" alt="" />
                </a>
            </div>
            <div className={'row2'}>
                <Dialog yourmessage={submittedMessage} />
            </div>
            <div className={'row3'}>
                <FaqTip />
                <Grade
                    question="Насколько полезен наш бот?"
                    options={['1', '2', '3', '4', '5']}
                    onVote={(value) => console.log('User voted:', value)}
                />
            </div>
        </div>
    );
}

export default function App() {
    const [message, setMessage] = useState('');
    const [submittedMessage, setSubmittedMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (message.trim()) {
            setSubmittedMessage(message);
            setMessage('');
            navigate('/chat'); // Перейти на другую страницу
        }
    };

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={
                    <HomePage message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
                } />
                <Route path="/chat" element={
                    <ChatPage submittedMessage={submittedMessage} />
                } />
            </Routes>
        </>
    );
}
