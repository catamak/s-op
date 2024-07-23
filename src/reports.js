import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import profileImage from './images/socar.png';
import './reports.css';

const Reports = () => {
  const [revision1, setRevision1] = useState(1);
  const [revision2, setRevision2] = useState(2);
  const [month, setMonth] = useState('');

  const handleRevision1Change = (event) => setRevision1(event.target.value);
  const handleRevision2Change = (event) => setRevision2(event.target.value);
  const handleMonthChange = (event) => setMonth(event.target.value);

  const data = [
    { factory: 'PVC', product: 'S23/59', rev1: 22, rev2: 25, diff: 3, compliance: 84.1 },
    { factory: 'PVC', product: 'S27R/63', rev1: 8, rev2: 3, diff: 6, compliance: 50 },
    { factory: 'PVC', product: 'S39/71', rev1: 38, rev2: 0, diff: 9, compliance: 50 },
    { factory: 'PVC', product: 'S65R/68', rev1: 20, rev2: 10, diff: 5, compliance: 75 },
    { factory: 'PVC', product: 'D', rev1: 28, rev2: 25, diff: 2, compliance: 0 },
    { factory: 'AYPE', product: 'G03-5', rev1: 29, rev2: 29, diff: 5, compliance: 0 },
    { factory: 'AYPE', product: 'H2-8', rev1: 2, rev2: 2, diff: 0, compliance: 0 },
    { factory: 'AYPE', product: 'F2-12', rev1: 27, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'G08-21T', rev1: 0, rev2: 0, diff: 0, compliance: 70 },
    { factory: 'AYPE-T', product: 'G08-21TA', rev1: 6, rev2: 3, diff: 0, compliance: 70 },
    { factory: 'AYPE-T', product: 'G03-21T', rev1: 1, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'H2-21T', rev1: 9, rev2: 4, diff: 0, compliance: 70 },
    { factory: 'AYPE-T', product: 'F2-21T', rev1: 5, rev2: 5, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'F5-21T', rev1: 5, rev2: 5, diff: 1, compliance: 75 },
    { factory: 'AYPE-T', product: 'H5-21T', rev1: 4, rev2: 2, diff: 1, compliance: 75 },
    { factory: 'AYPE-T', product: 'I22-19T', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'I22-19TA', rev1: 3, rev2: 3, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'H7-20T', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'D', rev1: 1, rev2: 1, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'I668 (UV)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'S0464', rev1: 5, rev2: 5, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'S0459', rev1: 5, rev2: 5, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'F00756', rev1: 6, rev2: 3, diff: 1.5, compliance: 70 },
    { factory: 'YYPE', product: 'B00552', rev1: 6, rev2: 3, diff: 1.5, compliance: 70 },
    { factory: 'YYPE', product: 'B00552/D', rev1: 6, rev2: 3, diff: 1.5, compliance: 70 },
    { factory: 'YYPE', product: 'I457 (UV)', rev1: 10, rev2: 5, diff: 2.5, compliance: 50 },
    { factory: 'YYPE', product: 'I860 (UV)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'I860 (O)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'I457 (O)', rev1: 3, rev2: 3, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'D', rev1: 4, rev2: 4, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH241', rev1: 3, rev2: 3, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH102', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH251', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'AG251', rev1: 2, rev2: 2, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH418', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH418 (%50)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH220', rev1: 5, rev2: 5, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH180', rev1: 10, rev2: 5, diff: 2.5, compliance: 275 },
    { factory: 'PP', product: 'EH341', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'AG241', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH082', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH318', rev1: 3, rev2: 3, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH251/MH418', rev1: 9, rev2: 9, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH122/EH102', rev1: 4, rev2: 4, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'D', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH418/MH220', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'MB', product: 'F03', rev1: 9, rev2: 9, diff: 0, compliance: 0 },
    { factory: 'PTA', product: 'Ü', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PTA', product: 'D', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PA', product: 'Ü', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PA', product: 'D', rev1: 1, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PA', product: 'PA (%50)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
  ];

  // Generate compliance and difference calculations
  const filteredData = data.map(item => {
    const rev1Value = item[`rev${revision1}`] || 0;
    const rev2Value = item[`rev${revision2}`] || 0;

    const fark = rev1Value - rev2Value;
    const uyum = ((rev1Value - (fark / 2)) * rev1Value * 100) || 0;

    return {
      ...item,
      selectedRev1: rev1Value,
      selectedRev2: rev2Value,
      fark: fark.toFixed(2),
      uyum: uyum.toFixed(2),
    };
  });

  // Example factory data for the right side table
  const factories = ['AYPE', 'AYPE-T', 'YYPE', 'PP', 'MB', 'PTA', 'PA'];
  const revisions = [1, 2, 3]; // Example revisions

  return (
    <div className="reports-page">
      <header className="header">
        <div className="header-content">
          <div className="user-profile">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <div className="username">SOCAR Türkiye</div>
          </div>
          <div className="controls">
            <Link to="/" className="nav-button">Ana Sayfa</Link>
            <Link to="/reports" className="nav-button">Raporlar</Link>
            <FormControl variant="outlined" className="dropdown">
              <InputLabel>Ay Seçin</InputLabel>
              <Select value={month} onChange={handleMonthChange} label="Ay Seçin">
                <MenuItem value="01">Ocak</MenuItem>
                <MenuItem value="02">Şubat</MenuItem>
                <MenuItem value="03">Mart</MenuItem>
                <MenuItem value="04">Nisan</MenuItem>
                <MenuItem value="05">Mayıs</MenuItem>
                <MenuItem value="06">Haziran</MenuItem>
                <MenuItem value="07">Temmuz</MenuItem>
                <MenuItem value="08">Ağustos</MenuItem>
                <MenuItem value="09">Eylül</MenuItem>
                <MenuItem value="10">Ekim</MenuItem>
                <MenuItem value="11">Kasım</MenuItem>
                <MenuItem value="12">Aralık</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="dropdown">
              <InputLabel>Revizyon 1</InputLabel>
              <Select value={revision1} onChange={handleRevision1Change} label="Revizyon 1">
                {revisions.map(rev => (
                  <MenuItem key={rev} value={rev}>Revizyon {rev}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="dropdown">
              <InputLabel>Revizyon 2</InputLabel>
              <Select value={revision2} onChange={handleRevision2Change} label="Revizyon 2">
                {revisions.map(rev => (
                  <MenuItem key={rev} value={rev}>Revizyon {rev}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </header>
      <div className="tables-container">
        <TableContainer component={Paper} className="table-container left-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fabrika</TableCell>
                <TableCell>Ürün</TableCell>
                <TableCell>Revizyon {revision1}</TableCell>
                <TableCell>Revizyon {revision2}</TableCell>
                <TableCell>Fark</TableCell>
                <TableCell>Uyum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.factory}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.selectedRev1}</TableCell>
                  <TableCell>{row.selectedRev2}</TableCell>
                  <TableCell>{row.fark}</TableCell>
                  <TableCell>{row.uyum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="table-container right-table">
          <TableContainer component={Paper} className="scrollable-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fabrika</TableCell>
                  {revisions.slice(1).map((_, idx) => (
                    <TableCell key={idx}>Uyum {idx + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {factories.map((factory, index) => (
                  <TableRow key={index}>
                    <TableCell>{factory}</TableCell>
                    {revisions.slice(1).map((_, idx) => (
                      <TableCell key={idx}>Value</TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Grand Total</TableCell>
                  {revisions.slice(1).map((_, idx) => (
                    <TableCell key={idx}>Total {idx + 1}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
