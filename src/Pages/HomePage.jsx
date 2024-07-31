import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
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

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1); // Ayları 0-11 arası alır, bu yüzden +1 ekliyoruz
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
    setFormStatus('submitted');
    setRevision((prev) => prev + 1);
  };

  const handleSendForReview = () => {
    setOpen(true);
  };

  const handlePublishRevision = () => {
    // "Revizyonu Yayınla" butonuna tıklandığında yapılacak işlemler
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

  return (
    <div className="home-page">
      <Navbar />
      <div className="toolbar">
        <div className="toolbar-left">
          <Box sx={{ minWidth: 120, marginRight: 2 }}>
            <FormControl fullWidth>
          
              <Select
                labelId="revision-label"
                id="revision-select"
                value={revision}
                label="Revizyon"
                onChange={handleRevisionChange}
              >
                <MenuItem value={-1}>Revizyon -1</MenuItem>
                <MenuItem value={0}>Revizyon 0</MenuItem>
                <MenuItem value={1}>Revizyon 1</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, marginRight: 2 }}>
            <FormControl fullWidth>
       
              <Select
                labelId="month-label"
                id="month-select"
                value={month}
                label="Ay"
                onChange={handleMonthChange}
              >
                <MenuItem value={1}>Ocak</MenuItem>
                <MenuItem value={2}>Şubat</MenuItem>
                <MenuItem value={3}>Mart</MenuItem>
                <MenuItem value={4}>Nisan</MenuItem>
                <MenuItem value={5}>Mayıs</MenuItem>
                <MenuItem value={6}>Haziran</MenuItem>
                <MenuItem value={7}>Temmuz</MenuItem>
                <MenuItem value={8}>Ağustos</MenuItem>
                <MenuItem value={9}>Eylül</MenuItem>
                <MenuItem value={10}>Ekim</MenuItem>
                <MenuItem value={11}>Kasım</MenuItem>
                <MenuItem value={12}>Aralık</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, marginRight: 2 }}>
            <FormControl fullWidth>
           
              <Select
                labelId="year-label"
                id="year-select"
                value={year}
                label="Yıl"
                onChange={handleYearChange}
              >
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="toolbar-right">
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#93BFB7', 
              color: 'white',
              '&:hover': {
                backgroundColor: '#608D90'
              },
              marginRight: 2 
            }}
          >
            Taslak Kaydet
          </Button>
          {formStatus === 'draft' ? (
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: ' #93BFB7', 
                color: 'white',
                '&:hover': {
                  backgroundColor: '#608D90'
                },
                marginRight: 2 
              }}
              onClick={handleSubmitForm}
            >
              Formu İlerlet
            </Button>
          ) : (
            <>
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: ' #93BFB7', 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#608D90'
                  },
                  marginRight: 2 
                }}
                onClick={handleSendForReview}
              >
                Görüşe Yolla
              </Button>
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: ' #93BFB7', 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#608D90'
                  }
                }}
                onClick={handlePublishRevision}
              >
                Revizyonu Yayınla
              </Button>
            </>
          )}
          <div className="toolbar-info">
            <span>Durum: Taslak Form</span>
            <span>Revizyon No: {revision}</span>
            <span>Revizyon Tarihi: 01.02.2024</span>
          </div>
        </div>
      </div>
      <div className="content">
        <ProductionTable revision={revision} month={month} year={year} />
      </div>
      <RevisionDialog
        open={open}
        onClose={handleClose}
        selectedFactory={selectedFactory}
        selectedCategories={selectedCategories}
        handleFactoryChange={handleFactoryChange}
        handleCategoryChange={handleCategoryChange}
        factoryRevisionText={factoryRevisionText}
        setFactoryRevisionText={setFactoryRevisionText}
        categoryRevisionText={categoryRevisionText}
        setCategoryRevisionText={setCategoryRevisionText}
        handleSendForReview={handleSendForReview}
      />
    </div>
  );
};

export default HomePage;
