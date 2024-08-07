import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './ComparisonToolbar.css';

const ComparisonToolbar = ({ month, setMonth, revision1, setRevision1, revision2, setRevision2 }) => {
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleRevision1Change = (event) => {
    setRevision1(event.target.value);
  };

  const handleRevision2Change = (event) => {
    setRevision2(event.target.value);
  };

  return (
    <div className="reportstoolbar">
      <Box sx={{ minWidth: 120, marginRight: 2, height: '40px' }} className="toolbar-item">
        <FormControl fullWidth>
          <InputLabel id="month-label">Ay</InputLabel>
          <Select
            labelId="month-label"
            id="month-select"
            value={month}
            label="Ay"
            onChange={handleMonthChange}
            sx={{
              backgroundColor: '#93BFB7',
              color: 'white',
              '& .MuiSelect-icon': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              height: '40px',
              lineHeight: '50px',
              fontSize: '16px'
            }}
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
      <Box sx={{ minWidth: 120, marginRight: 2, height: '40px' }} className="toolbar-item">
        <FormControl fullWidth>
          <Select
            labelId="revision1-label"
            id="revision1-select"
            value={revision1}
            label="Revizyon 1"
            onChange={handleRevision1Change}
            sx={{
              backgroundColor: '#93BFB7',
              color: 'white',
              '& .MuiSelect-icon': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              height: '40px',
              lineHeight: '50px',
              fontSize: '16px'
            }}
          >
            <MenuItem value={-1}>Revizyon -1</MenuItem>
            <MenuItem value={0}>Revizyon 0</MenuItem>
            <MenuItem value={1}>Revizyon 1</MenuItem>
            <MenuItem value={2}>Revizyon 2</MenuItem>
            <MenuItem value={3}>Revizyon 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120, height: '40px' }} className="toolbar-item">
        <FormControl fullWidth>
          <Select
            labelId="revision2-label"
            id="revision2-select"
            value={revision2}
            label="Revizyon 2"
            onChange={handleRevision2Change}
            sx={{
              backgroundColor: '#93BFB7',
              color: 'white',
              '& .MuiSelect-icon': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              height: '40px',
              lineHeight: '40px',
              fontSize: '16px'
            }}
          >
            <MenuItem value={-1}>Revizyon -1</MenuItem>
            <MenuItem value={0}>Revizyon 0</MenuItem>
            <MenuItem value={1}>Revizyon 1</MenuItem>
            <MenuItem value={2}>Revizyon 2</MenuItem>
            <MenuItem value={3}>Revizyon 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default ComparisonToolbar;
