import './Vkladi.css';

export default function Vkladi({choose}) {
    return (
        <>
            {choose === 5 && (
                <div className="deposit-card">
                    <h2 className="deposit-title">Преимущества вклада</h2>

                    <div className="benefit-card">
                        <div className="benefit-icon accent-blue">📈</div>
                        <div className="benefit-text">
                            <h3>До 19,5% годовых</h3>
                            <p>Максимальная ставка на сроках 91-367 дней при открытии онлайн с надбавками</p>
                        </div>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon accent-green">💻</div>
                        <div className="benefit-text">
                            <h3>Открыть дистанционно выгоднее</h3>
                            <p>+1% за открытие в приложении, интернет-банке или банкоматах</p>
                        </div>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon accent-gold">💰</div>
                        <div className="benefit-text">
                            <h3>От 15 000 ₽</h3>
                            <p>Минимальная сумма онлайн, 300 000 ₽ — в офисе</p>
                        </div>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon accent-purple">➕</div>
                        <div className="benefit-text">
                            <h3>Дополнительные надбавки</h3>
                            <p>+0,2% новым и зарплатным клиентам</p>
                        </div>
                    </div>
                </div>
            )}
            {choose === 4 ?
                <div className="deposit-container">
                    <div className="deposit-header">
                        <h2 className="deposit-main-title">Преимущества вклада</h2>
                        <div className="title-decoration"></div>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card interest-card">
                            <div className="card-icon">💹</div>
                            <div className="card-content">
                                <h3 className="card-title">До 4,2% годовых</h3>
                                <p className="card-description">Максимальная ставка на сроке 367 дней с капитализацией
                                    процентов</p>
                            </div>
                            <div className="card-badge">Выгодно</div>
                        </div>

                        <div className="benefit-card amount-card">
                            <div className="card-icon">💰</div>
                            <div className="card-content">
                                <h3 className="card-title">5 000 ¥</h3>
                                <p className="card-description">Минимальная сумма при открытии онлайн, 10 000 ¥ — в
                                    офисе</p>
                            </div>
                        </div>

                        <div className="benefit-card rate-card">
                            <div className="card-icon">🔒</div>
                            <div className="card-content">
                                <h3 className="card-title">Фиксированная ставка</h3>
                                <p className="card-description">На весь срок вклада</p>
                            </div>
                        </div>

                        <div className="benefit-card capitalization-card">
                            <div className="card-icon">🔄</div>
                            <div className="card-content">
                                <h3 className="card-title">Капитализация процентов</h3>
                                <p className="card-description">Выплата процентов на вклад ежемесячно</p>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
            )
            {choose === 3 ? <div className="depositBenefits">
                <h2 className="benefitsTitle">Вклад "Максимальный доход"</h2>

                <div className="benefitItem rate-card">
                    <div className="benefitIcon">💹</div>
                    <div className="benefitContent">
                        <h3>До 20,2% годовых</h3>
                        <p>Максимальная ставка на сроках 120, 181 и 213 дней с надбавкой за новые деньги</p>
                        <span className="specialBadge">Спецпредложение</span>
                    </div>
                </div>

                <div className="benefitItem bonus-card">
                    <div className="benefitIcon">➕</div>
                    <div className="benefitContent">
                        <h3>+1% надбавка за новые деньги</h3>
                        <p>Средства, которых не было на ваших счетах в Газпромбанке за 30 дней до открытия вклада</p>
                    </div>
                </div>

                <div className="benefitItem amount-card">
                    <div className="benefitIcon">💰</div>
                    <div className="benefitContent">
                        <h3>15 000 ₽</h3>
                        <p>Минимальная сумма в приложении/онлайн, 300 000 ₽ — в офисе</p>
                    </div>
                </div>

                <button className="depositButton">Открыть вклад онлайн</button>
            </div> :  null
            }



        </>)
}