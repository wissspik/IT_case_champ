import React from 'react';
import './FinanceTip.css'; // подключаем стили

const FinanceTip = () => {
    const tips = [
        "Следите за курсом перед обменом валюты.",
        "Открытие вклада онлайн может дать дополнительный процент.",
        "Не обменивайте валюту в выходные — курс часто невыгоден.",
        "Используйте мобильное приложение для быстрого доступа к вкладам.",
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
        <>
            <div className="finance-tip">
                <h2 className="finance-tip__title">💡 Совет дня</h2>
                <p className="finance-tip__text">{randomTip}</p>
            </div>
        </>

    )
        ;
};

export default FinanceTip;
