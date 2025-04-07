import './App.css';
import React, {useState} from 'react';
import Header from './components/Header';
import Start from './components/Start';
import Dialog from './components/Dialog';

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
                    <Dialog yourmessage={submittedMessage}/>
                </>
                 :
                <Start message={message} setMessage={setMessage} handleSubmit={handleSubmit}/> }
        </>


    );
}
