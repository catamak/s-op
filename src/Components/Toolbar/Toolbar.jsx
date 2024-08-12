// Toolbar.js
import React, { useState } from 'react';
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
  isTableComplete 
}) => {
  const [showAdvancedButtons, setShowAdvancedButtons] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAdvanceForm = () => {
    if (!isTableComplete) {
      setSnackbarMessage('Lütfen tabloyu tamamlayın.');
      setSnackbarOpen(true);
      return;
    }
    setShowAdvancedButtons(true);
    handleSubmitForm();
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
              sx={{ fontSize: 16, backgroundColor: '#f5f5f5' }}
            >
              {[...Array(12).keys()].map(i => (
                <MenuItem key={i+1} value={i+1}>
                  {new Date(0, i).toLocaleString('tr-TR', { month: 'long' })}
                </MenuItem>
              ))}
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
              sx={{ fontSize: 16, backgroundColor: '#f5f5f5' }}
            >
              {[2022, 2023, 2024, 2025].map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
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
              sx={{ fontSize: 16, backgroundColor: '#f5f5f5' }}
              renderValue={(selected) => selected === "" ? "Revizyon" : `Revizyon ${selected}`}
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
                backgroundColor: '#93BFB7', 
                color: 'white',
                '&:hover': { backgroundColor: '#608D90' },
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
                '&:hover': { backgroundColor: '#608D90' }
              }}
              onClick={handleAdvanceForm}
              disabled={!isTableComplete}
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
                '&:hover': { backgroundColor: '#608D90' },
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
                '&:hover': { backgroundColor: '#608D90' },
                marginRight: 2 
              }}
              onClick={handleSendForReview}
              disabled={!isTableComplete}
            >
              Görüşe Yolla
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#93BFB7', 
                color: 'white',
                '&:hover': { backgroundColor: '#608D90' }
              }}
              onClick={handlePublishRevision}
              disabled={!isTableComplete}
            >
              Revizyonu Yayınla
            </Button>
          </>
        )}

        <div className="toolbar-info">
          <span>
            Durum: {formStatus === 'draft' ? 'Taslak Form' : formStatus === 'submitted' ? 'Gönderildi' : formStatus === 'inReview' ? 'Görüş Bekleniyor' : 'Revizyon Yayında'}
          </span>
          <span>Revizyon No: {revision}</span>
          <span>Revizyon Tarihi: {new Date().toLocaleDateString('tr-TR')}</span>
        </div>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toolbar;
