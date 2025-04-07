import React from 'react'

 export default function dialog({yourmessage}) {
    return (
        <>
            <div className={'user'}>
                <p>{yourmessage}</p>
            </div>
            <div className={'bot'}>
                <p>Привет дорогой пользователь ты очень крут <br/> пожалуйста выбери одну из этих кнопочек</p>
                <button>Коммисия</button>
                <button>Обмен валюты</button>
                <button>Че то еще</button>
            </div>

        </>


    )
 }