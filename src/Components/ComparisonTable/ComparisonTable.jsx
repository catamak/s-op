import React from 'react';
import './ComparisonTable.css';

const ComparisonTable = ({ title, data, rev1Label, rev2Label }) => {
  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th colSpan="6" className="table-main-header">{title}</th>
        </tr>
        <tr>
          <th>FABRİKA</th>
          <th>ÜRÜN</th>
          <th>{rev1Label}</th>
          <th>{rev2Label}</th>
          <th>FARK</th>
          <th>UYUM</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.factory}</td>
            <td>{row.product}</td>
            <td>{row.rev1}</td>
            <td>{row.rev2}</td>
            <td>{row.diff}</td>
            <td>{row.conformity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ComparisonTable;
