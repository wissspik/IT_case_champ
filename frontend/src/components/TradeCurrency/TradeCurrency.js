import { useState } from 'react';
import axios from 'axios';
import './TradeCurrency.css';

export default function TradeCurrency() {
    const [currencyHave, setCurrencyHave] = useState('RUB');
    const [currencyNeed, setCurrencyNeed] = useState('EUR');
    const [amountHave, setAmountHave] = useState('');
    const [amountNeed, setAmountNeed] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const currencies = ['RUB', 'EUR', 'CNY', 'TRY', 'KZT', 'HKD', 'CHF','USD','GBP','XAU'];

    const fetchExchangeRate = async (amount, currencyIn, currencyOut) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/countries/currency_calculation",
                {
                    exchange_methods: "exchange_rates_internet_bank",
                    amount: amount,
                    currency_in: currencyIn,
                    currency_out: currencyOut
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            return response.data.amount;
        } catch (error) {
            console.error("Ошибка при конвертации:", error);
            setError('Ошибка при получении курса обмена');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const handleAmountChange = async (value, isFromHave) => {
        if (value === '') {
            setAmountHave('');
            setAmountNeed('');
            return;
        }

        if (isNaN(value)) return;

        const amount = parseFloat(value);
        if (isFromHave) {
            setAmountHave(value);
            if (amount > 0) {
                const convertedAmount = await fetchExchangeRate(amount, currencyHave, currencyNeed);
                if (convertedAmount !== null) {
                    setAmountNeed(convertedAmount.toFixed(2));
                }
            } else {
                setAmountNeed('');
            }
        } else {
            setAmountNeed(value);
            if (amount > 0) {
                const convertedAmount = await fetchExchangeRate(amount, currencyNeed, currencyHave);
                if (convertedAmount !== null) {
                    setAmountHave(convertedAmount.toFixed(2));
                }
            } else {
                setAmountHave('');
            }
        }
    };

    const handleCurrencyChange = async (currency, isFromHave) => {
        if (isFromHave) {
            setCurrencyHave(currency);
            if (amountHave && parseFloat(amountHave) > 0) {
                const convertedAmount = await fetchExchangeRate(parseFloat(amountHave), currency, currencyNeed);
                if (convertedAmount !== null) {
                    setAmountNeed(convertedAmount.toFixed(2));
                }
            }
        } else {
            setCurrencyNeed(currency);
            if (amountHave && parseFloat(amountHave) > 0) {
                const convertedAmount = await fetchExchangeRate(parseFloat(amountHave), currencyHave, currency);
                if (convertedAmount !== null) {
                    setAmountNeed(convertedAmount.toFixed(2));
                }
            }
        }
    };

    const swapCurrencies = async () => {
        const tempCurrency = currencyHave;
        setCurrencyHave(currencyNeed);
        setCurrencyNeed(tempCurrency);

        if (amountHave && parseFloat(amountHave) > 0) {
            const convertedAmount = await fetchExchangeRate(parseFloat(amountHave), currencyNeed, tempCurrency);
            if (convertedAmount !== null) {
                setAmountNeed(convertedAmount.toFixed(2));
            }
        }
    };

    return (
        <div className="trade-currency-container">
            <h2 className="trade-currency-title">Конвертер валют</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="currency-converter">
                <div className="currency-section">
                    <div className="currency-selector">
                        {currencies.map(currency => (
                            <button
                                key={`have-${currency}`}
                                className={`currency-option ${currencyHave === currency ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange(currency, true)}
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                            <span className="currency-code">{currencyHave}</span>
                        </div>
                    </div>
                </div>

                <button
                    className="swap-button"
                    onClick={swapCurrencies}
                    disabled={isLoading}
                >
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
                                disabled={isLoading}
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
                                className="currency-input"
                                placeholder="0.00"
                                readOnly
                            />
                            <span className="currency-code">{currencyNeed}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading && <div className="loading-indicator">Загрузка...</div>}

            {amountHave && !isLoading && !error && (
                <div className="conversion-rate">
                    Курс обмена: 1 {currencyHave} ≈ {(parseFloat(amountNeed)/parseFloat(amountHave)).toFixed(6)} {currencyNeed}
                </div>
            )}
        </div>
    );
}