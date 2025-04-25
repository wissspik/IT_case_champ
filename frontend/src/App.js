import './App.css';
import React, {useState} from 'react';
import Header from './components/Header/Header';
import Start from './components/Start/Start';
import Dialog from './components/Dialog/Dialog';
import FinanceTip from "./components/FinanceTip/FinanceTip";
import FaqTip from "./components/Faq/Faq";
import Grade from './components/Grades/Grade';

export default function App() {
    const [message, setMessage] = useState('');
    const [submittedMessage, setSubmittedMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmittedMessage(message);
        setMessage('');
    };
    return (
        <>
            <Header/>
            {submittedMessage.trim() ?
                <>
                    <div style={{
                        backgroundImage: "url('/img/backk.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh',
                    }}>
                        <div className={'row1'}>
                            <FinanceTip/>
                            <img className={'img-finance'} src="/img/Group21.png"  alt=""/>
                        </div>
                        <div className={'row2'}>
                            <Dialog yourmessage={submittedMessage}/>
                        </div>
                        <div className={'row3'}>
                            <FaqTip/>
                            <Grade
                                question="Насколько полезен наш бот?"
                                options={['1', '2', '3', '4', '5']}
                                onVote={(value) => console.log('User voted:', value)}
                            />
                        </div>

                    </div>

                </>
                : <>
                    <div className={'fade-in'}>
                        <div
                            style={{
                                backgroundImage: "url('/img/background.png')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '100vh',
                            }}
                        >
                            <Start message={message} setMessage={setMessage} handleSubmit={handleSubmit}/>
                        </div>

                    </div>


                </>
            }
        </>
    );
}
