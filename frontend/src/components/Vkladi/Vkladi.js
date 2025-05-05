import './Vkladi.css';

export default function Vkladi({ choose }) {
  // Общая функция для рендеринга карточки вклада
  const renderDepositCard = (title, benefits, showButton = false) => (
    <div className="deposit-card">
      <h2 className="deposit-title">{title}</h2>

      {benefits.map((benefit, index) => (
        <div key={index} className={`benefit-card ${benefit.highlight ? 'highlight-card' : ''}`}>
          <div className={`benefit-icon ${benefit.accentClass}`}>{benefit.icon}</div>
          <div className="benefit-text">
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
            {benefit.badge && <span className="special-badge">{benefit.badge}</span>}
          </div>
        </div>
      ))}


    </div>
  );

  const depositData = {
    5: {
      title: "Вклад «Копить»",
      benefits: [
        {
          icon: "📈",
          title: "До 19,5% годовых",
          description: "Максимальная ставка на сроках 91-367 дней при открытии онлайн с надбавками",
          accentClass: "accent-blue",
          badge: "Акция",
          highlight: true
        },
        {
          icon: "💻",
          title: "Открыть дистанционно выгоднее",
          description: "+1% за открытие в приложении, интернет-банке или банкоматах",
          accentClass: "accent-green"
        },
        {
          icon: "💰",
          title: "От 15 000 ₽",
          description: "Минимальная сумма онлайн, 300 000 ₽ — в офисе",
          accentClass: "accent-gold"
        },
        {
          icon: "➕",
          title: "Дополнительные надбавки",
          description: "+0,2% новым и зарплатным клиентам",
          accentClass: "accent-purple"
        }
      ],
      showButton: true
    },
    4: {
      title: "Вклад «Расширяй возможности»",
      benefits: [
        {
          icon: "💹",
          title: "До 4,2% годовых",
          description: "Максимальная ставка на сроке 367 дней с капитализацией процентов",
          accentClass: "accent-blue"
        },
        {
          icon: "💰",
          title: "5 000 ¥",
          description: "Минимальная сумма при открытии онлайн, 10 000 ¥ — в офисе",
          accentClass: "accent-gold"
        },
        {
          icon: "🔒",
          title: "Фиксированная ставка",
          description: "На весь срок вклада",
          accentClass: "accent-purple"
        },
        {
          icon: "🔄",
          title: "Капитализация процентов",
          description: "Выплата процентов на вклад ежемесячно",
          accentClass: "accent-green"
        }
      ]
    },
    3: {
      title: "Вклад «Новые деньги»",
      benefits: [
        {
          icon: "💹",
          title: "До 20,2% годовых",
          description: "Максимальная ставка на сроках 120, 181 и 213 дней с надбавкой",
          accentClass: "accent-blue",
          badge: "Спецпредложение",
          highlight: true
        },
        {
          icon: "➕",
          title: "+1% надбавка",
          description: "За новые деньги, которых не было на счетах 30 дней",
          accentClass: "accent-green"
        },
        {
          icon: "💰",
          title: "15 000 ₽",
          description: "Минимальная сумма в приложении/онлайн",
          accentClass: "accent-gold"
        }
      ],
      showButton: true
    },
    2: {
      title: "Вклад «В балансе»",
      benefits: [
        {
          icon: "📈",
          title: "До 21,4% годовых",
          description: "Максимальная ставка на сроке 120 дней с надбавкой за остатки",
          accentClass: "accent-blue",
          highlight: true
        },
        {
          icon: "💳",
          title: "+3% за остатки на карте",
          description: "Сохраняйте среднемесячный остаток для повышенного дохода",
          accentClass: "accent-green"
        },
        {
          icon: "💰",
          title: "15 000 ₽",
          description: "Минимальная сумма онлайн, 300 000 ₽ — в офисе",
          accentClass: "accent-gold"
        }
      ]
    },
    1: {
      title: "Вклад «В плюсе»",
      benefits: [
        {
          icon: "💎",
          title: "До 20,2% годовых",
          description: "На сроках 120-213 дней с опцией «Накопления»",
          accentClass: "accent-blue",
          badge: "Премиум"
        },
        {
          icon: "➕",
          title: "+1% к ставке",
          description: "С опцией «Накопления» в Газпром Бонус «Плюс»/«Премиум»",
          accentClass: "accent-green"
        },
        {
          icon: "💰",
          title: "15 000 ₽",
          description: "Минимальная сумма для открытия вклада",
          accentClass: "accent-gold"
        },
        {
          icon: "🛡️",
          title: "Средства защищены",
          description: "Страхование вкладов до 1,4 млн ₽",
          accentClass: "accent-purple"
        }
      ],
      showButton: true
    }
  };

  return <>{depositData[choose] && renderDepositCard(
    depositData[choose].title,
    depositData[choose].benefits,
    depositData[choose].showButton
  )}</>;
}