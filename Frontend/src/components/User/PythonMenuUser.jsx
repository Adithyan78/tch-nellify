import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemButton,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    Alert,
    TextField,
    InputAdornment,
    IconButton,
    Divider,
    Paper,
    ListItemIcon
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

import CodeIcon from '@mui/icons-material/Code'; // Example icon for list items

const PythonMenuUser = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('https://tch-nellify-2.onrender.com/python-programs'); // Replace with your API endpoint
                setPrograms(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const handleListItemClick = async (id) => {
        try {
            const response = await axios.get(`https://tch-nellify-2.onrender.com/python-programs/${id}`);
            setSelectedProgram(response.data);
            setDialogOpen(true);
        } catch (err) {
            setError(err);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedProgram(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    // Filter programs based on search term
    const filteredPrograms = programs.filter(program =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <CircularProgress size={60} color="primary" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Alert severity="error">Error loading programs: {error.message}</Alert>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ display: 'flex', padding: 4, gap: 2 }}>
                {/* Left section with programs list */}
                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Python Programs
                    </Typography>
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 370 }}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {filteredPrograms.map((program) => (
                                <ListItem key={program._id} disablePadding>
                                    <ListItemButton 
                                        onClick={() => handleListItemClick(program._id)} 
                                        sx={{ 
                                            padding: 2, 
                                            borderRadius: 1,
                                            mb: 1, // Add spacing between items
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            '&:hover': { 
                                                backgroundColor: 'rgba(224, 224, 224, 0.9)', // Slightly darker on hover
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <CodeIcon />
                                        </ListItemIcon>
                                        <Typography variant="body1" sx={{ flex: 1 }}>
                                            {program.title}
                                        </Typography>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>

                {/* Right section with search bar */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <TextField
                        variant="outlined"
                        label="Search Programs"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searchTerm && (
                                        <IconButton onClick={handleClearSearch}>
                                            <ClearIcon />
                                        </IconButton>
                                    )}
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: '100%',
                            maxWidth: '350px',
                            mb: 2,
                            '& .MuiInputBase-root': {
                                borderRadius: 2,
                                backgroundColor: '#fafafa',
                                padding: '0 12px',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1976d2',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1565c0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1565c0',
                                },
                            },
                        }}
                    />
                </Box>
            </Box>

            {selectedProgram && (
                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    maxWidth="md"
                    fullWidth
                    sx={{
                        '& .MuiPaper-root': {
                            borderRadius: 3,
                            padding: 2,
                            boxShadow: 24,
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            margin: 8,
                            width: '400px', // Adjust width as needed
                            maxWidth: '90vw', // Adjust max width as needed
                        },
                        '& .MuiDialogTitle-root': {
                            backgroundColor: '#1976d2',
                            color: 'white',
                            padding: '16px 24px',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        },
                        '& .MuiDialogContent-root': {
                            padding: 2,
                        }
                    }}
                >
                    <DialogTitle>
                        <Typography variant="h6">{selectedProgram.title}</Typography>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                            {selectedProgram.description}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line', backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
                            <strong>Code:</strong> {selectedProgram.code}
                        </Typography>
                        <Divider sx={{ mb: 2, mt: 2 }} />
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line', backgroundColor: '#e8f5e9', padding: 2, borderRadius: 1 }}>
                            <strong>Algorithm:</strong> {selectedProgram.algorithm}
                        </Typography>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default PythonMenuUser;
