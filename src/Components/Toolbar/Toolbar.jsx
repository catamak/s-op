import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Button, Box, Snackbar, Alert } from '@mui/material';
import './Toolbar.css';

const Toolbar = ({ 
  month, setMonth, 
  year, setYear, 
  revision, setRevision, 
  formStatus, handleSubmitForm, 
  handleSendForReview, 
  handlePublishRevision, 
  handleNewRevision,
  isFormValid // Form geçerliliği kontrolü için prop ekledik
}) => {
  const [showAdvancedButtons, setShowAdvancedButtons] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (!isFormValid) {
      setShowAdvancedButtons(false);
    }
  }, [isFormValid]);

  const handleAdvanceForm = () => {
    if (isFormValid) {
      setShowAdvancedButtons(true);
      handleSubmitForm();
    } else {
      setSnackbarMessage('Lütfen tüm dropdown değerlerini seçiniz.');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <Box sx={{ minWidth: 120, marginRight: 2 }}>
          <FormControl fullWidth>
            <Select
              id="month-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Ay' }}
              sx={{ fontSize: 16 }}
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
              id="year-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Yıl' }}
              sx={{ fontSize: 16 }}
            >
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, marginRight: 2 }}>
          <FormControl fullWidth>
            <Select
              id="revision-select"
              value={revision}
              onChange={(e) => setRevision(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Revizyon' }}
              sx={{ fontSize: 16 }}
              renderValue={(selected) => {
                if (selected === "") {
                  return "Revizyon";
                }
                return `Revizyon ${selected}`;
              }}
            >
              {revision > 0 ? (
                [...Array(revision + 1).keys()].map(i => (
                  <MenuItem key={i} value={i}>Revizyon {i}</MenuItem>
                ))
              ) : (
                <MenuItem disabled>Geçmiş Revizyon Bulunamadı</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="toolbar-right">
        {!showAdvancedButtons ? (
          <>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: isFormValid ? '#93BFB7' : '#CCCCCC', // Geçerli değilse gri
                color: 'white',
                '&:hover': {
                  backgroundColor: isFormValid ? '#608D90' : '#AAAAAA'
                },
                marginRight: 2 
              }}
              onClick={handleSubmitForm}
              disabled={!isFormValid} // Geçerli değilse butonu devre dışı bırak
            >
              Taslak Kaydet
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: isFormValid ? '#93BFB7' : '#CCCCCC', // Geçerli değilse gri
                color: 'white',
                '&:hover': {
                  backgroundColor: isFormValid ? '#608D90' : '#AAAAAA'
                }
              }}
              onClick={handleAdvanceForm}
              disabled={!isFormValid} // Geçerli değilse butonu devre dışı bırak
            >
              Formu İlerlet
            </Button>
          </>
        ) : (
          <>
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
              onClick={handleSubmitForm}
            >
              Taslak Kaydet
            </Button>
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
              onClick={handleSendForReview}
            >
              Görüşe Yolla
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#93BFB7', 
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
          <span>Durum: {formStatus === 'draft' ? 'Taslak Form' : formStatus === 'submitted' ? 'Gönderildi' : formStatus === 'inReview' ? 'Görüş Bekleniyor' : 'Revizyon Yayında'}</span>
          <span>Revizyon No: {revision}</span>
          <span>Revizyon Tarihi: {new Date().toLocaleDateString('tr-TR')}</span>
        </div>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toolbar;
