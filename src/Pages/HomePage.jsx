import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Toolbar from '../Components/Toolbar/Toolbar';
import { Snackbar, Alert } from '@mui/material';
import ProductionTable from '../Components/Table/ProductionTable';
import RevisionDialog from '../Components/RevisionDialog/RevisionDialog';
import './HomePage.css';

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
  const [isTableComplete, setIsTableComplete] = useState(false); // Tablo tamamlanma durumu

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
  }, []);

  const handleRevisionChange = (event) => {
    setRevision(event.target.value);
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
          value_id: row[0], // Örnek değerler
          factory_Product_id: row[1], // Örnek değerler
          value: row[2], // Örnek değerler
          revision_id: revision,
          date: new Date().toISOString(),
          inserted_Time: new Date().toISOString(),
          updated_Time: new Date().toISOString(),
          isDeleted: false,
          updated_User: "user" // Örnek değer
        }))
      };

      fetch('https://localhost:7032/api/Revisions/submit-production-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setFormStatus('submitted');
        setSnackbarMessage('Form başarıyla ilerletildi.');
        setSnackbarOpen(true);
        setShowReviewAndPublishButtons(true);
      })
      .catch(error => {
        console.error('Error:', error);
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
        isTableComplete={isTableComplete} // Tablo tamamlanma durumunu geçiyoruz
      />
      <div className="content">
        <ProductionTable
          revision={revision}
          month={month}
          year={year}
          updateTableData={updateTableData}
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
