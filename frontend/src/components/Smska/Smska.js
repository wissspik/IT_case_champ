import React from "react";
import './Smska.css'
import {Send, Trash2} from "lucide-react";

export default function Smska({input, messages, handleSend, setInput, clear}) {
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
            <footer>
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
                            <button onClick={handleSend} className="icon-button send-button-indialog">
                                <Send size={18}/>
                            </button>
                            <button onClick={clear} className="icon-button clear-button">
                                <Trash2 size={18}/>
                            </button>
                        </label>

                    </div>
                </form>
            </footer>

        </div>
    );
}
