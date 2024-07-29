import React from 'react';
import { render } from 'react-dom';

const CustomRenderer = ({ value }) => {
  return (
    <div style={{ color: value > 50 ? 'green' : 'red' }}>
      {value}
    </div>
  );
};

export const renderCustomCell = (instance, td, row, col, prop, value, cellProperties) => {
  render(<CustomRenderer value={value} />, td);
};

// Kullanılmayan 'number' değişkenini kaldırdım
