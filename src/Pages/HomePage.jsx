import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Toolbar from '../Components/Toolbar/Toolbar';
import { Snackbar, Alert } from '@mui/material';
import ProductionTable from '../Components/Table/ProductionTable';
import './HomePage.css';

const HomePage = () => {
  const [revision, setRevision] = useState(-1);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [formStatus, setFormStatus] = useState('draft');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [tableData, setTableData] = useState([]);
  const [factoriesData, setFactoriesData] = useState([]);
  const [dropdownValues, setDropdownValues] = useState({});
  const [isTableComplete, setIsTableComplete] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
  }, []);

  useEffect(() => {
    if (revision > -1) {
      fetchRevisionData(revision);
    }
  }, [revision]);

  const fetchRevisionData = (revisionId) => {
    fetch(`https://localhost:7032/api/Factories/get-revision-data/${revisionId}`)
      .then(response => response.json())
      .then(data => {
        setTableData(data);
      })
      .catch(error => {
        console.error('Error fetching revision data:', error);
      });
  };

  const handleNewRevision = () => {
    setRevision(prev => prev + 1);
    setFormStatus('draft');
    setTableData([]);
    setIsTableComplete(false);
    setSnackbarMessage('Yeni revizyon oluşturuldu.');
    setSnackbarOpen(true);
  };

  const handleSubmitForm = () => {
    if (isTableComplete) {
      const status = formStatus === 'draft' ? 0 : (formStatus === 'inReview' ? 1 : 2);
      const comment = "Initial Revision";  // Burada Comment alanı tanımlanmalı
  
      const requestData = {
          revisionNo: revision,
          createdBy: "user123",
          status,
          comment,  // Comment alanını JSON yapısına ekleyin
          revisionDate: new Date().toISOString(),
        
        ProductLines: factoriesData.flatMap((factory, factoryIndex) =>
          factory.productLines.map((line, lineIndex) => {
            const monthlyCapacities = tableData.map(row => {
              const [day, date, ...values] = row;
              const productCapacityData = values[factoryIndex * factory.productLines.length + lineIndex];
              const [productCode, capacity] = productCapacityData ? productCapacityData.split('|') : ['', ''];
  
              return {
                date,
                productCode,
                capacity: parseFloat(capacity) || 0,
                insertedTime: new Date().toISOString(),
                updatedTime: new Date().toISOString(),
                isDeleted: false,
                updatedUser: "user123"
              };
            });
  
            return {
              factory: factory.factory_Name,
              line: line.line_Name,
              monthlyCapacities
            };
          })
        )
      };
  
      console.log("Request Data:", JSON.stringify(requestData, null, 2));
  
      fetch('https://localhost:7032/api/Revisions/submit-production-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          setFormStatus('submitted');
          setSnackbarMessage('Form başarıyla ilerletildi.');
          setSnackbarOpen(true);
        })
        .catch(error => {
          console.error('Error:', error);
          setSnackbarMessage(`Hata: ${error.message}`);
          setSnackbarOpen(true);
        });
    } else {
      setSnackbarMessage('Lütfen tüm dropdown değerlerini seçiniz.');
      setSnackbarOpen(true);
    }
  };
  
  
  
  
  const updateTableData = (data, isComplete) => {
    console.log(data);
    setTableData(data);
    setIsTableComplete(isComplete);
  };

  return (
    <div className="home-page">
      <Navbar formStatus={formStatus} handleNewRevision={handleNewRevision} />
      <Toolbar
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        revision={revision}
        setRevision={setRevision}
        formStatus={formStatus}
        handleSubmitForm={handleSubmitForm}
        isTableComplete={isTableComplete}
      />
      <div className="content">
        <ProductionTable
          factoriesData={factoriesData}
          dropdownValues={dropdownValues}
          revision={revision}
          month={month}
          year={year}
          updateTableData={updateTableData}
        />
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;
