import React from "react";
import './Smska.css'
export default function Smska({ input, messages, handleSend, setInput }) {
    return (
        <div className="chat-container">
            <div className={'size-messages'}>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text ? (
                            msg.text.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))
                        ) : (
                            msg.component
                        )}
                    </div>
                ))}
            </div>
            <footer className={''} >
                <form onSubmit={handleSend}>
                    <div>
                        <label>
                            <input
                                type="text"
                                className="message-in-chat"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Введите сообщение"
                            />
                        </label>
                    </div>
                </form>
            </footer>

        </div>
    );
}
