import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Toolbar from '../Components/Toolbar/Toolbar';
import { Snackbar, Alert } from '@mui/material';
import ProductionTable from '../Components/Table/ProductionTable';
import RevisionDialog from '../Components/RevisionDialog/RevisionDialog';
import './HomePage.css';

// Custom function to get factory line ID from column index
const getFactoryLineIdFromColIndex = (colIndex) => {
  // Add logic to determine the factory line ID based on the column index
  // Placeholder example:
  return colIndex + 1;
};

const HomePage = () => {
  const [revision, setRevision] = useState(-1);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [formStatus, setFormStatus] = useState('draft');
  const [open, setOpen] = useState(false);
  const [selectedFactory, setSelectedFactory] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [factoryRevisionText, setFactoryRevisionText] = useState('');
  const [categoryRevisionText, setCategoryRevisionText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [tableData, setTableData] = useState([]);
  const [showReviewAndPublishButtons, setShowReviewAndPublishButtons] = useState(false);
  const [isTableComplete, setIsTableComplete] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
  }, []);

  useEffect(() => {
    const fetchRevisionData = async () => {
      try {
        const response = await fetch(`https://localhost:7032/api/Revisions/revisions`);
        const revisionData = await response.json();

        const selectedRevision = revisionData.find(rev => rev.revision_No === revision);

        if (selectedRevision) {
          const mappedData = tableData.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
              if (colIndex >= 2) { // Ignore 'Gün' and 'Tarih' columns
                const factoryLineId = getFactoryLineIdFromColIndex(colIndex);
                const valueEntry = selectedRevision.values.find(val => val.factory_Product_id === factoryLineId && val.date === row[1]);

                return valueEntry ? valueEntry.value : '';
              }
              return cell;
            });
          });

          setTableData(mappedData);
        }
      } catch (error) {
        console.error('Error fetching revision data:', error);
        setSnackbarMessage('Revisyon verilerini yüklerken hata oluştu.');
        setSnackbarOpen(true);
      }
    };

    if (revision) {
      fetchRevisionData();
    }
  }, [revision, month, year, tableData]);

  const handleRevisionChange = (event) => {
    const selectedRevision = event.target.value;
    setRevision(selectedRevision);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSubmitForm = () => {
    if (isTableComplete) {
      const requestData = {
        revision_No: revision,
        status: true,
        comment: "Initial Revision",
        revision_Date: new Date().toISOString(),
        values: tableData.map(row => ({
          value_id: parseInt(row[0], 10) || 0,
          factory_Product_id: parseInt(row[1], 10) || 0,
          value: parseFloat(row[2]) || 0,
          revision_id: revision,
          date: new Date().toISOString(),
          inserted_Time: new Date().toISOString(),
          updated_Time: new Date().toISOString(),
          isDeleted: false,
          updated_User: "user"
        }))
      };
  
      fetch('https://localhost:7032/api/Factories/submit-production-schedule', {
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
        setShowReviewAndPublishButtons(true);
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

  const handleSendForReview = () => {
    setFormStatus('inReview');
    setSnackbarMessage('Form görüşe gönderildi.');
    setSnackbarOpen(true);
    setOpen(true);
  };

  const handlePublishRevision = () => {
    setRevision(prev => prev + 1);
    setFormStatus('published');
    setSnackbarMessage('Revizyon yayınlandı.');
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFactoryChange = (event) => {
    setSelectedFactory(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleCategoryDelete = (category) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const handleNewRevision = () => {
    setRevision(prev => prev + 1);
    setFormStatus('draft');
    setTableData([]);
    setShowReviewAndPublishButtons(false);
    setSnackbarMessage('Yeni revizyon oluşturuldu.');
    setSnackbarOpen(true);
  };

  const updateTableData = (data, isComplete) => {
    setTableData(data);
    setIsTableComplete(isComplete);
  };

  // Fetch data for a specific revision
  const fetchRevisionData = (revisionId) => {
    fetch(`https://localhost:7032/api/Factories/get-revision-data/${revisionId}`)
      .then(response => response.json())
      .then(data => {
        setTableData(data.values); // Only necessary data fields are set
      })
      .catch(error => {
        console.error('Error fetching revision data:', error);
      });
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
        handleSendForReview={handleSendForReview}
        handlePublishRevision={handlePublishRevision}
        handleNewRevision={handleNewRevision}
        isTableComplete={isTableComplete}
      />
      <div className="content">
        <ProductionTable
          revision={revision}
          month={month}
          year={year}
          updateTableData={updateTableData}
          tableData={tableData}
        />
      </div>
      <RevisionDialog
        open={open}
        onClose={handleClose}
        selectedFactory={selectedFactory}
        selectedCategories={selectedCategories}
        handleFactoryChange={handleFactoryChange}
        handleCategoryChange={handleCategoryChange}
        handleCategoryDelete={handleCategoryDelete}
        factoryRevisionText={factoryRevisionText}
        setFactoryRevisionText={setFactoryRevisionText}
        categoryRevisionText={categoryRevisionText}
        setCategoryRevisionText={setCategoryRevisionText}
        handleSendForReview={handleSendForReview}
      />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;
