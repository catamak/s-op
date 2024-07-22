import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import './ModalComponent.css';

const factoryNames = ['Factory 1', 'Factory 2', 'Factory 3'];
const categories = ['Category A', 'Category B', 'Category C', 'Category D'];

const ModalComponent = ({ modalIsOpen, closeModal }) => {
  const theme = useTheme();
  const [selectedFactory, setSelectedFactory] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [factoryDescription, setFactoryDescription] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleFactoryChange = (event) => {
    setSelectedFactory(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Modal open={modalIsOpen} onClose={closeModal}>
      <div className="modal-content">
        <h2 className="modal-title">Görüşe Yolla</h2>
        <div className="content-container">
          <div className="dropdowns-container">
            <FormControl className="dropdown" variant="outlined" size="small">
              <InputLabel id="factory-select-label">Fabrika Seçin</InputLabel>
              <Select
                labelId="factory-select-label"
                id="factory-select"
                value={selectedFactory}
                onChange={handleFactoryChange}
                input={<OutlinedInput label="Fabrika Seçin" />}
              >
                {factoryNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="dropdown" variant="outlined" size="small">
              <InputLabel id="category-select-label">Kategorileri Seçin</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Kategorileri Seçin" />}
                renderValue={(selected) => (
                  <div className="chips">
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </div>
                )}
              >
                {categories.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={{
                      fontWeight:
                        selectedCategories.indexOf(name) === -1
                          ? theme.typography.fontWeightRegular
                          : theme.typography.fontWeightMedium,
                    }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="revision-container">
            <div className="revision-section">
              <h3>Fabrika Revizyon Açıklaması</h3>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={factoryDescription}
                onChange={(e) => setFactoryDescription(e.target.value)}
                className="text-input"
                size="small"
              />
              <div className="button-group">
                <Button variant="contained" color="primary" className="edit-button">
                  Düzenle
                </Button>
                <Button variant="contained" color="primary" className="save-button">
                  Kaydet
                </Button>
              </div>
            </div>
            <div className="revision-section">
              <h3>Kategori Revizyon Açıklaması</h3>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="text-input"
                size="small"
              />
              <div className="button-group">
                <Button variant="contained" color="primary" className="edit-button">
                  Düzenle
                </Button>
                <Button variant="contained" color="primary" className="save-button">
                  Kaydet
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="selected-info">
          <h4>Seçilen Fabrika:</h4>
          <p>{selectedFactory}</p>
          <h4>Seçilen Kategoriler:</h4>
          <p>{selectedCategories.join(', ')}</p>
        </div>
        <div className="modal-actions">
          <Button variant="contained" color="primary" onClick={closeModal} size="small">
            Vazgeç
          </Button>
          <Button variant="contained" color="primary" size="small">
            Görüşe Yolla
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
