import { useState } from 'react'
import './TradeCurrency.css'
export default function TradeCurrency() {
    const [currencyhave, setCurrencyhave] = useState('')
    const [currencyneed, setCurrencyneed] = useState('')

    const choosebutton = (text, from) => {
        if (from === 'have') {
            setCurrencyhave(text)
        } else {
            setCurrencyneed(text)
        }
    }

    const currency = ['RUB', 'EUR', 'CNY', 'TRY', 'KZT', 'HKD', 'CHF']

    return (
        <div className="trade-currency">
            <p className="header-text-currency">Конвертер валют</p>

            <div className="trade-currency-have">
                <span>
                    {currency.map(item => (
                        <button
                            key={item}
                            onClick={() => choosebutton(item, 'have')}
                            className={currencyhave === item ? 'active-button' : ''}
                        >
                            {item}
                        </button>
                    ))}
                </span>
                <div className="trade-currency-form">
                    <p>У меня есть</p>
                    <input type="text" className="dynamic-text" />
                </div>
            </div>

            <div className="trade-currency-need">
                <span>
                    {currency.map(item => (
                        <button
                            key={item}
                            onClick={() => choosebutton(item, 'need')}
                            className={currencyneed === item ? 'active-button' : ''}
                        >
                            {item}
                        </button>
                    ))}
                </span>
                <div className="trade-currency-form">
                    <p>Мне нужно</p>
                    <input type="text" className="dynamic-text" />
                </div>
            </div>
        </div>
    )
}
