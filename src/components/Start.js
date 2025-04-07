import React from 'react'


export default function Start({message,setMessage,handleSubmit}) {
    return (
        <div className={'App-main'}>
            <span className={'txt'}>Чем я могу помочь?</span>
            <div className={''}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <input className={'forma'} type="text" value={message}
                                   onChange={(e) => setMessage(e.target.value)}
                                   placeholder={'Введите ваше сообщение'}
                            />
                        </label>
                    </div>
                </form>

            </div>
        </div>
    );
}
