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

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1
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
        const {
            target: { value },
        } = event;
        setSelectedCategories(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSendForReview = () => {
        // İşlem yapılacak yer: form verilerini işleyin
        console.log('Fabrika:', selectedFactory);
        console.log('Kategoriler:', selectedCategories);
        console.log('Fabrika Açıklaması:', factoryDescription);
        console.log('Kategori Açıklaması:', categoryDescription);

        // Modal'ı kapat
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
                    <div className="dropdown-group">
                        <FormControl fullWidth sx={{ width: 'calc(100% - 250px)', height: 'calc(100% - 30px)' }}>
                            <InputLabel id="factory-select-label">Fabrika Seçin</InputLabel>
                            <Select
                                labelId="factory-select-label"
                                id="factory-select"
                                value={selectedFactory}
                                label="Fabrika Seçin"
                                onChange={handleFactoryChange}
                                sx={{ height: '100%' }} // Ensure Select takes full height of FormControl
                            >
                                {factories.map((factory) => (
                                    <MenuItem key={factory} value={factory}>{factory}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <textarea
                            className="description-input"
                            placeholder="Fabrika Revizyon Açıklaması"
                            value={factoryDescription}
                            onChange={(e) => setFactoryDescription(e.target.value)}
                        />
                        <button className="save-button">Kaydet</button>
                    </div>
                    <div className="dropdown-group">
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="category-select-label">Kategorileri Seçin</InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                multiple
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Kategorileri Seçin" />}
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
                        <textarea
                            className="description-input"
                            placeholder="Kategori Revizyon Açıklaması"
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                        />
                        <button className="save-button">Kaydet</button>
                    </div>
                </div>
                <div className="right-section">
                    <h3>Seçilenler</h3>
                    <input
                        type="text"
                        className="result-input"
                        value={selectedFactory}
                        placeholder="Seçilen Fabrika"
                        readOnly
                    />
                    <input
                        type="text"
                        className="result-input"
                        value={selectedCategories.join(', ')}
                        placeholder="Seçilen Kategoriler"
                        readOnly
                    />
                </div>
            </div>
            <div className="button-group">
                <button className="modal-button" onClick={closeModal}>Vazgeç</button>
                <button className="modal-button" onClick={handleSendForReview}>Görüşe Yolla</button>
            </div>
        </Modal>
    );
}

export default ModalComponent;
