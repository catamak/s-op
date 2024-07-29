import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import './Toolbar.css';

const Toolbar = ({ month, setMonth, revision1, setRevision1, revision2, setRevision2 }) => {
  return (
    <div className="toolbar">
      <Box sx={{ minWidth: 120, marginRight: 2 }} className="toolbar-item">
        <FormControl fullWidth>
          <InputLabel id="month-label">Ay</InputLabel>
          <Select
            labelId="month-label"
            id="month-select"
            value={month}
            label="Ay"
            onChange={(e) => setMonth(e.target.value)}
          >
            <MenuItem value="Ocak">Ocak</MenuItem>
            <MenuItem value="Şubat">Şubat</MenuItem>
            <MenuItem value="Mart">Mart</MenuItem>
            <MenuItem value="Nisan">Nisan</MenuItem>
            <MenuItem value="Mayıs">Mayıs</MenuItem>
            <MenuItem value="Haziran">Haziran</MenuItem>
            <MenuItem value="Temmuz">Temmuz</MenuItem>
            <MenuItem value="Ağustos">Ağustos</MenuItem>
            <MenuItem value="Eylül">Eylül</MenuItem>
            <MenuItem value="Ekim">Ekim</MenuItem>
            <MenuItem value="Kasım">Kasım</MenuItem>
            <MenuItem value="Aralık">Aralık</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120, marginRight: 2 }} className="toolbar-item">
        <FormControl fullWidth>
          <InputLabel id="revision1-label">Revizyon 1</InputLabel>
          <Select
            labelId="revision1-label"
            id="revision1-select"
            value={revision1}
            label="Revizyon 1"
            onChange={(e) => setRevision1(e.target.value)}
          >
            <MenuItem value="-1">Revizyon -1</MenuItem>
            <MenuItem value="0">Revizyon 0</MenuItem>
            <MenuItem value="1">Revizyon 1</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120, marginRight: 2 }} className="toolbar-item">
        <FormControl fullWidth>
          <InputLabel id="revision2-label">Revizyon 2</InputLabel>
          <Select
            labelId="revision2-label"
            id="revision2-select"
            value={revision2}
            label="Revizyon 2"
            onChange={(e) => setRevision2(e.target.value)}
          >
            <MenuItem value="-1">Revizyon -1</MenuItem>
            <MenuItem value="0">Revizyon 0</MenuItem>
            <MenuItem value="1">Revizyon 1</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Toolbar;
