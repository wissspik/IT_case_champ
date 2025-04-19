import React, { useState } from 'react';
import './Faq.css';

const faqs = [
  { question: 'Как узнать курс валют?', answer: 'Вы можете узнать текущий курс на нашем сайте в разделе "Курсы валют" или задать вопрос боту.' },
  { question: 'Как оформить вклад онлайн?', answer: 'Перейдите в мобильное приложение или на сайт в раздел "Вклады" и следуйте инструкциям.' },
  { question: 'Как работает обмен валют?', answer: 'Обмен осуществляется через наш онлайн-сервис: выберите валюту, введите сумму и подтвердите операцию.' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faq">
      <h3>🏷 Часто задаваемые вопросы</h3>
      <ul className="faq-list">
        {faqs.map((item, idx) => (
          <li key={idx} className="faq-item">
            <div className="faq-question" onClick={() => toggle(idx)}>
              {item.question}
            </div>
            {openIndex === idx && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default FAQ;
