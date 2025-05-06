import React from 'react';
import './Table.css';
const TransferTable = ({data}) => {
  return (
    <div className="table-container">
      <h2 className="table-title">💸 Комиссии по переводам</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Банк</th>
            <th>Страна</th>
            <th>Способ</th>
            <th>Валюта</th>
            <th>Комиссия</th>
            <th>Мин.</th>
            <th>Макс.</th>
            <th>Комментарий</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.bank}</td>
              <td>{item.country}</td>
              <td>{item.method}</td>
              <td>{item.currency}</td>
              <td>
                <span className="commission-badge">{item.commission}%</span>
              </td>
              <td>{item.limit_min}</td>
              <td>{item.limit_max}</td>
              <td className="comment-note">{item.comments}</td>
              <td className="amount-highlight">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransferTable;