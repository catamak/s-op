import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import './ModalComponent.css';

const customStyles = {
  content: {
    width: '1000px',
    height: '530px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
  },
};

Modal.setAppElement('#root');

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'Kategori 1',
  'Kategori 2',
  'Kategori 3',
  'Kategori 4',
];

const factories = [
  'Fabrika 1',
  'Fabrika 2',
  'Fabrika 3',
];

function getStyles(name, selectedCategories, theme) {
  return {
    fontWeight: selectedCategories.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  };
}

function ModalComponent({ modalIsOpen, closeModal }) {
  const theme = useTheme();
  const [selectedFactory, setSelectedFactory] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [factoryDescription, setFactoryDescription] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleFactoryChange = (event) => {
    setSelectedFactory(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { target: { value } } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSendForReview = () => {
    console.log('Fabrika:', selectedFactory);
    console.log('Kategoriler:', selectedCategories);
    console.log('Fabrika Açıklaması:', factoryDescription);
    console.log('Kategori Açıklaması:', categoryDescription);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Görüşe Yolla Modal"
    >
      <h2>Görüşe Yolla</h2>
      <div className="modal-content">
        <div className="left-section">
          <div className="input-container">
            <label htmlFor="factory">Fabrika Seç:</label>
            <select
              id="factory"
              value={selectedFactory}
              onChange={handleFactoryChange}
              className="select-dropdown"
            >
              <option value="">Seçiniz</option>
              {factories.map((factory, index) => (
                <option key={index} value={factory}>
                  {factory}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="factoryDescription">Fabrika Açıklaması:</label>
            <textarea
              id="factoryDescription"
              value={factoryDescription}
              onChange={(e) => setFactoryDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="right-section">
          <div className="input-container">
            <label htmlFor="categories">Kategoriler:</label>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="categories-label">Kategoriler</InputLabel>
              <Select
                labelId="categories-label"
                id="categories"
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput id="select-multiple-chip" label="Kategoriler" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    style={getStyles(category, selectedCategories, theme)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="input-container">
            <label htmlFor="categoryDescription">Kategori Açıklaması:</label>
            <textarea
              id="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="button-group">
        <button onClick={handleSendForReview}>Gönder</button>
        <button onClick={closeModal}>Kapat</button>
      </div>
    </Modal>
  );
}

export default ModalComponent;
