import React from 'react'
import './Start.css'

export default function Start({message, setMessage, handleSubmit}) {
    return (
        <div className={'App-main'}>
            <img className={'line1'} src="/img/line1.png" alt=""/>
            <img className={'card1'} src="/img/valuta.png" alt=""/>
            <img className={'card2'} src="/img/carta.png" alt=""/>

            <span className={'txt-on-main'}>Чем я могу помочь?</span>
            <div className={''}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <input className={'first-user-message'} type="text" value={message}
                                   onChange={(e) => setMessage(e.target.value)}
                                   placeholder={'Введите ваше сообщение'}
                            />
                        </label>
                    </div>
                </form>
            </div>
            <img className={'card3'} src="/img/comissia.png" alt=""/>
            <img className={'card4'} src="/img/perevod.png" alt=""/>
            <img className={'line2'} src="/img/image97.png" alt=""/>
        </div>
    );
}
