import {useState} from 'react'
import './TradeCurrency.css'

export default function TradeCurrency() {
    const [currencyhave, setCurrencyhave] = useState('')
    const [currencyneed, setCurrencyneed] = useState('')
    const [need, setNeed] = useState('')
    const [have, setHave] = useState('')

    const choosebutton = (text, from) => {
        if (from === 'have') {
            setCurrencyhave(text)
        } else {
            setCurrencyneed(text)
        }
    }

    const curs = 100 // пример курса: 1 EUR = 100 RUB
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
                    <input
                        value={have}
                        type="text"
                        className="dynamic-text"
                        onChange={(e) => {
                            const val = e.target.value
                            setHave(val)
                            setNeed(val ? (Number(val) * (1 / curs)).toFixed(2) : '')
                        }}
                    />
                    <span className={'dynamic-text'}>{currencyhave}</span>
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
                    <input
                        value={need}
                        type="text"
                        className="dynamic-text"
                        onChange={(e) => {
                            const val = e.target.value
                            setNeed(val)
                            setHave(val ? (Number(val) * curs).toFixed(2) : '')
                        }}
                    />
                    <span className={'dynamic-text'}>{currencyneed}</span>
                </div>
            </div>
        </div>
    )
}
