import React from "react";

export default function Smska({ input, messages, handleSend, setInput }) {
    return (
        <div className="chat-container">
            <div>
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
            <form onSubmit={handleSend}>
                <div>
                    <label>
                        <input
                            type="text"
                            className="forma2"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Введите сообщение"
                        />
                    </label>
                </div>
            </form>
        </div>
    );
}
