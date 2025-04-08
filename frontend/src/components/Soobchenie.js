import React from "react";

export default function Soobchenie ({message,setMessage,handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    <input className={'forma2'} type="text" value={message}
                           onChange={(e) => setMessage(e.target.value)}
                           placeholder={'Введите ваше сообщение'}
                    />

                </label>
            </div>
        </form>
    )
}