import './Deposit.css'

export default function Deposit2() {
    return (
        <div className="deposit-card">
            <h2>💰 Условия накопительного счета</h2>

            <div className="deposit-item">
                <span className="label">📌 Выплата процентов</span>
                <p>Каждый месяц</p>
            </div>

            <div className="deposit-item">
                <span className="label">📅 Доступ к деньгам</span>
                <p>24/7</p>
            </div>

            <div className="deposit-item">
                <span className="label">🌐 Оформление:</span>
                <p>Онлайн</p>
            </div>

            <div className="deposit-item">
                <span className="label">🔒 Начисление процентов</span>
                <p>На ежедневный или минимальный остаток</p>
            </div>
        </div>
    )

}