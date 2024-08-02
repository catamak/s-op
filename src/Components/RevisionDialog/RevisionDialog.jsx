import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Button,
    Box,
    IconButton,
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel'; // Çıkarma ikonu için
import './RevisionDialog.css';

const categories = [
    'Arızi Duruş/Kapasite Kaybı',
    'Satış Talebi',
    'Diğer Fabrika/Ünite Kaynaklı',
    'Hammadde',
    'Kalite Kaybı',
    'Ticari',
    'Planlı Duruş'
];

const factories = [
    'PVC 1.Hat',
    'PVC 2.Hat',
    'PVC 3.Hat',
    'PVC 4.Hat',
    'AYPE 1.Hat',
    'AYPE 2.Hat',
    'AYPE-T'
];

const RevisionDialog = ({
    open,
    onClose,
    selectedFactory,
    selectedCategories,
    handleFactoryChange,
    handleCategoryChange,
    handleCategoryDelete, // Kategori silme fonksiyonu
    factoryRevisionText,
    setFactoryRevisionText,
    handleSendForReview
}) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                Revizyon Detayları
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <div className="revision-dialog">
                    <div className="revision-select">
                        <Box sx={{ minWidth: 200, marginBottom: 2 }}>
                            <FormControl fullWidth required>
                                <InputLabel id="factory-label">Fabrikalar Seçiniz</InputLabel>
                                <Select
                                    labelId="factory-label"
                                    id="factory-select"
                                    value={selectedFactory}
                                    label="Fabrikalar Seçiniz"
                                    onChange={handleFactoryChange}
                                >
                                    {factories.map((factory) => (
                                        <MenuItem key={factory} value={factory}>
                                            {factory}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 200, marginBottom: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Kategori Seçiniz</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category-select"
                                    multiple
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                    input={<OutlinedInput label="Kategori Seçiniz" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    onDelete={() => handleCategoryDelete(value)} // Kategori silme fonksiyonu
                                                    deleteIcon={<CancelIcon />}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                                            <ListItemText primary={category} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="revision-text">
                        <div className="revision-text-section">
                            <InputLabel>Revizyon Açıklaması</InputLabel>
                            <textarea
                                className="revision-textarea"
                                value={factoryRevisionText}
                                onChange={(e) => setFactoryRevisionText(e.target.value)}
                            />
                            <div className="revision-buttons">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => alert('Kaydet butonuna tıklandı!')}
                                >
                                    Kaydet
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => alert('Düzenle butonuna tıklandı!')}
                                >
                                    Düzenle
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="selected-info">
                        <InputLabel>Seçilen Fabrika ve Kategoriler</InputLabel>
                        <textarea
                            className="selected-info-textarea"
                            value={`Fabrika: ${selectedFactory}\nKategoriler: ${selectedCategories.join(', ')}\nRevizyon Açıklaması: ${factoryRevisionText}`}
                            readOnly
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#76ABAE',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#608D90'
                        }
                    }}
                    onClick={handleSendForReview}
                >
                    Görüşe Yolla
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RevisionDialog;
