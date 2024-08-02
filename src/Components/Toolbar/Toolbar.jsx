import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import './Toolbar.css';

const Toolbar = ({ 
  month, setMonth, 
  year, setYear, 
  revision, setRevision, 
  formStatus, handleSubmitForm, 
  handleSendForReview, 
  handlePublishRevision, 
  handleNewRevision 
}) => {
  const [showAdvancedButtons, setShowAdvancedButtons] = useState(false);

  const handleAdvanceForm = () => {
    setShowAdvancedButtons(true);
    handleSubmitForm(); // Trigger any necessary logic or form submission
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <Box sx={{ minWidth: 120, marginRight: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="month-label">Ay</InputLabel>
            <Select
              labelId="month-label"
              id="month-select"
              value={month}
              label="Ay"
              onChange={(e) => setMonth(e.target.value)}
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
            <InputLabel id="year-label">Yıl</InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={year}
              label="Yıl"
              onChange={(e) => setYear(e.target.value)}
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
            <InputLabel id="revision-label">Revizyon</InputLabel>
            <Select
              labelId="revision-label"
              id="revision-select"
              value={revision}
              label="Revizyon"
              onChange={(e) => setRevision(e.target.value)}
            >
              {[...Array(revision + 1).keys()].map(i => (
                <MenuItem key={i} value={i}>Revizyon {i}</MenuItem>
              ))}
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
                }
              }}
              onClick={handleAdvanceForm}
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
          <span>Durum: {formStatus === 'draft' ? 'Taslak Form' : formStatus === 'submitted' ? 'Gönderildi' : formStatus === 'inReview' ? 'Görüş Bekleniyor' : 'Yayında'}</span>
          <span>Revizyon No: {revision}</span>
          <span>Revizyon Tarihi: {new Date().toLocaleDateString('tr-TR')}</span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
