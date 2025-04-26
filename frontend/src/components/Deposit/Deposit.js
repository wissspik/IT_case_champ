import './Deposit.css'

export default function DepositInfo() {
  return (
    <div className="deposit-card">
      <h2>💰 Условия вклада</h2>

      <div className="deposit-item">
        <span className="label">📌 Минимальная сумма:</span>
        <p>15000 ₽ — при открытии через приложение или интернет-банк</p>
        <p>300000 ₽ — при открытии в офисе</p>
      </div>

      <div className="deposit-item">
        <span className="label">📅 Минимальный срок:</span>
        <p>1 месяц</p>
      </div>

      <div className="deposit-item">
        <span className="label">🌐 Оформление:</span>
        <p>Онлайн</p>
      </div>

      <div className="deposit-item">
        <span className="label">🔒 Гарантии:</span>
        <p>Средства застрахованы в АСВ до 1,4 млн ₽</p>
      </div>
    </div>
  )
}
