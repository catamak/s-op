import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    IconButton,
    OutlinedInput,
    Chip,
    Checkbox,
    ListItemText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

const RevisionDialog = ({
    open,
    onClose,
    selectedFactory,
    selectedProductLine,
    selectedCategories,
    handleFactoryChange,
    handleProductLineChange,
    handleCategoryChange,
    handleCategoryDelete,
    factoryRevisionText,
    setFactoryRevisionText,
    handleSendForReview
}) => {
    const [factories, setFactories] = useState([]);
    const [productLines, setProductLines] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchFactories = async () => {
            try {
                const response = await axios.get('https://localhost:7032/api/Factories');
                if (response.status === 200) {
                    setFactories(response.data);
                } else {
                    console.error(`API Error: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching factories:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:7032/api/Categories');
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    console.error(`API Error: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchFactories();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedFactory) {
            const selectedFactoryData = factories.find(factory => factory.factory_Name === selectedFactory);
            setProductLines(selectedFactoryData ? selectedFactoryData.productLines : []);
        } else {
            setProductLines([]);
        }
    }, [selectedFactory, factories]);

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
                    <Box sx={{ minWidth: 200, marginBottom: 2 }}>
                        <FormControl fullWidth required>
                            <InputLabel id="factory-label">Fabrika Seçiniz</InputLabel>
                            <Select
                                labelId="factory-label"
                                id="factory-select"
                                value={selectedFactory}
                                label="Fabrika Seçiniz"
                                onChange={handleFactoryChange}
                            >
                                {factories.map(factory => (
                                    <MenuItem key={factory.factory_id} value={factory.factory_Name}>
                                        {factory.factory_Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 200, marginBottom: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="product-line-label">Hat Seçiniz</InputLabel>
                            <Select
                                labelId="product-line-label"
                                id="product-line-select"
                                value={selectedProductLine}
                                label="Hat Seçiniz"
                                onChange={handleProductLineChange}
                                disabled={!selectedFactory} // Disable if no factory is selected
                            >
                                {productLines.map(line => (
                                    <MenuItem key={line.product_Line_id} value={line.line_Name}>
                                        {line.line_Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 150, marginBottom: 2 }}>
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
                                                onDelete={() => handleCategoryDelete(value)}
                                                deleteIcon={<CancelIcon />}
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                {categories.map(category => (
                                    <MenuItem key={category.category_id} value={category.category_Name}>
                                        <Checkbox checked={selectedCategories.indexOf(category.category_Name) > -1} />
                                        <ListItemText primary={category.category_Name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="revision-text">
                        <InputLabel>Revizyon Açıklaması</InputLabel>
                        <textarea
                            className="revision-textarea"
                            value={factoryRevisionText}
                            onChange={(e) => setFactoryRevisionText(e.target.value)}
                        />
                    </div>
                    <div className="selected-info">
                        <InputLabel>Seçilen Fabrika ve Kategoriler</InputLabel>
                        <textarea
                            className="selected-info-textarea"
                            value={`Fabrika: ${selectedFactory}\nHattı: ${selectedProductLine}\nKategoriler: ${selectedCategories.join(', ')}\nRevizyon Açıklaması: ${factoryRevisionText}`}
                            readOnly
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant=""
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
