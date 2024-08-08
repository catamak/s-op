import React, { useState, useCallback } from 'react';
import ProductionTable from './ProductionTable';
import Toolbar from './Toolbar';

const ParentComponent = () => {
  const [month, setMonth] = useState(8); // Default month
  const [year, setYear] = useState(2024); // Default year
  const [revision, setRevision] = useState(-1); // Default revision
  const [formStatus, setFormStatus] = useState('draft');
  const [isFormValid, setIsFormValid] = useState(false);
  const [data, setData] = useState([]); // Tablodaki verileri saklamak için state

  const handleSubmitForm = () => {
    const values = data.map((row, rowIndex) => {
      return row.slice(2).map((cell, colIndex) => {
        return {
          Factory_Product_id: colIndex + 1, // Örnek olarak, gerçek Factory_Product_id değerlerini belirle
          Value: cell,
          Date: new Date(year, month - 1, rowIndex + 1),
          Updated_User: "user" // Örnek olarak, gerçek kullanıcı bilgisini belirle
        };
      });
    }).flat();

    const requestData = {
      Revision_No: revision,
      Status: true,
      Comment: "Initial Revision",
      Revision_Date: new Date(),
      Values: values
    };

    fetch('https://localhost:7032/api/Revisions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setFormStatus('submitted'); // Form durumu güncelleme
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleSendForReview = () => {
    console.log('Form sent for review');
  };

  const handlePublishRevision = () => {
    console.log('Revision published');
  };

  const handleNewRevision = () => {
    console.log('New revision created');
  };

  const updateTableData = useCallback((tableData) => {
    setData(tableData); // Tablodaki verileri state'e güncelle
    const isAllDropdownsSelected = tableData.every(row => row.slice(2).every(cell => cell));
    setIsFormValid(isAllDropdownsSelected); // Form geçerliliğini kontrol et
  }, []);

  return (
    <div>
      <Toolbar
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        revision={revision}
        setRevision={setRevision}
        formStatus={formStatus}
        handleSubmitForm={handleSubmitForm}
        handleSendForReview={handleSendForReview}
        handlePublishRevision={handlePublishRevision}
        handleNewRevision={handleNewRevision}
        isFormValid={isFormValid}
      />
      <ProductionTable
        month={month}
        year={year}
        revision={revision}
        updateTableData={updateTableData}
      />
    </div>
  );
};

export default ParentComponent;
