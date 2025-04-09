import React from "react";

export default function Chat ({input,messages,handleSend,setInput})  {
    return (
        <div className="chat-container">
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p className={'user'}>{msg.text}</p>
                        <div className={'bot'}>
                            <p>Привет я пока не умею обрабатывать сообщение <br/> нажми лучше на кнопочки</p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSend}>
                <div>
                    <label>
                        <input
                            type="text"
                            className={'forma2'}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={'Введите сообщение'}

                        />
                    </label>
                </div>
            </form>
        </div>
    );
};


