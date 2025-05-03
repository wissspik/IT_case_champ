import { useState } from 'react';
import './TradeCurrency.css';

export default function TradeCurrency() {
    const [currencyHave, setCurrencyHave] = useState('RUB');
    const [currencyNeed, setCurrencyNeed] = useState('EUR');
    const [amountHave, setAmountHave] = useState('');
    const [amountNeed, setAmountNeed] = useState('');

    // Пример реальных курсов (можно заменить на API)
    const exchangeRates = {
        RUB: { EUR: 0.01, CNY: 0.08, TRY: 0.30, KZT: 5.00, HKD: 0.09, CHF: 0.009, RUB: 1 },
        EUR: { RUB: 100, CNY: 8.00, TRY: 30.00, KZT: 500.00, HKD: 9.00, CHF: 0.90, EUR: 1 },
        CNY: { RUB: 12.50, EUR: 0.125, TRY: 3.75, KZT: 62.50, HKD: 1.125, CHF: 0.1125, CNY: 1 },
        TRY: { RUB: 3.33, EUR: 0.033, CNY: 0.267, KZT: 16.67, HKD: 0.30, CHF: 0.03, TRY: 1 },
        KZT: { RUB: 0.20, EUR: 0.002, CNY: 0.016, TRY: 0.06, HKD: 0.018, CHF: 0.0018, KZT: 1 },
        HKD: { RUB: 11.11, EUR: 0.111, CNY: 0.889, TRY: 3.33, KZT: 55.56, CHF: 0.10, HKD: 1 },
        CHF: { RUB: 111.11, EUR: 1.11, CNY: 8.89, TRY: 33.33, KZT: 555.56, HKD: 10.00, CHF: 1 }
    };

    const currencies = ['RUB', 'EUR', 'CNY', 'TRY', 'KZT', 'HKD', 'CHF'];

    const handleAmountChange = (value, isFromHave) => {
        if (value === '') {
            setAmountHave('');
            setAmountNeed('');
            return;
        }

        if (isNaN(value)) return;

        if (isFromHave) {
            setAmountHave(value);
            const rate = exchangeRates[currencyHave][currencyNeed];
            setAmountNeed((value * rate).toFixed(2));
        } else {
            setAmountNeed(value);
            const rate = exchangeRates[currencyNeed][currencyHave];
            setAmountHave((value * rate).toFixed(2));
        }
    };

    const handleCurrencyChange = (currency, isFromHave) => {
        if (isFromHave) {
            setCurrencyHave(currency);
            if (amountHave) {
                const rate = exchangeRates[currency][currencyNeed];
                setAmountNeed((amountHave * rate).toFixed(2));
            }
        } else {
            setCurrencyNeed(currency);
            if (amountHave) {
                const rate = exchangeRates[currencyHave][currency];
                setAmountNeed((amountHave * rate).toFixed(2));
            }
        }
    };

    const swapCurrencies = () => {
        setCurrencyHave(currencyNeed);
        setCurrencyNeed(currencyHave);
        setAmountHave(amountNeed);
        setAmountNeed(amountHave);
    };

    return (
        <div className="trade-currency-container">
            <h2 className="trade-currency-title">Конвертер валют</h2>

            <div className="currency-converter">
                <div className="currency-section">
                    <div className="currency-selector">
                        {currencies.map(currency => (
                            <button
                                key={`have-${currency}`}
                                className={`currency-option ${currencyHave === currency ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange(currency, true)}
                            >
                                {currency}
                            </button>
                        ))}
                    </div>

                    <div className="currency-input-group">
                        <label className="input-label">У меня есть</label>
                        <div className="input-wrapper-trade">
                            <input
                                type="number"
                                value={amountHave}
                                onChange={(e) => handleAmountChange(e.target.value, true)}
                                className="currency-input"
                                placeholder="0.00"
                            />
                            <span className="currency-code">{currencyHave}</span>
                        </div>
                    </div>
                </div>

                <button className="swap-button" onClick={swapCurrencies}>
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/>
                    </svg>
                </button>

                <div className="currency-section">
                    <div className="currency-selector">
                        {currencies.map(currency => (
                            <button
                                key={`need-${currency}`}
                                className={`currency-option ${currencyNeed === currency ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange(currency, false)}
                            >
                                {currency}
                            </button>
                        ))}
                    </div>

                    <div className="currency-input-group">
                        <label className="input-label">Мне нужно</label>
                        <div className="input-wrapper-trade">
                            <input
                                type="number"
                                value={amountNeed}
                                onChange={(e) => handleAmountChange(e.target.value, false)}
                                className="currency-input"
                                placeholder="0.00"
                                readOnly
                            />
                            <span className="currency-code">{currencyNeed}</span>
                        </div>
                    </div>
                </div>
            </div>

            {amountHave && (
                <div className="conversion-rate">
                    1 {currencyHave} = {(exchangeRates[currencyHave][currencyNeed]).toFixed(6)} {currencyNeed}
                </div>
            )}
        </div>
    );
}