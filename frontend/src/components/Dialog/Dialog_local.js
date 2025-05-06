import React, {useEffect, useState} from "react";
import Smska from "../Smska/Smska";
import Buttoniany from "../Buttoniany/Buttoniany";

export default function Dialog_Local(yourmessage) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        localStorage.setItem('first-message', yourmessage);
        const firstMessage = localStorage.getItem('first-message');
        setMessages([
            {sender: 'user-message', text: firstMessage},
            {
                sender: 'bot-message',
                text: 'Привет!'

            },
        ]);
    }, []);
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);
    return (
        <div>
            <Smska
                input={input}
                handleSend={handleSend}
                setInput={setInput}
                messages={messages}
                clear={ClearMessages}
            />
        </div>

    )


}