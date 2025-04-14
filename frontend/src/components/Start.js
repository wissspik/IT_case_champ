import React from 'react'


export default function Start({message, setMessage, handleSubmit}) {
    return (
        <div className={'App-main'}>
            <img className={'line1'} src="/img/line1.png" alt=""/>
            <div className={'carder'}>
                <img className={'card1'} src="/img/valuta.png" alt=""/>
                <img className={'card2'} src="/img/carta.png" alt=""/>
            </div>
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
            <div className={'carder'}>
                <img className={'card3'} src="/img/comissia.png" alt=""/>
                <img className={'card4'} src="/img/perevod.png" alt=""/>
            </div>

            <img className={'line2'} src="/img/image97.png" alt=""/>
        </div>
    );
}
