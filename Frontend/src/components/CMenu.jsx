import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
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
    Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';
import Navbar from './NavBar';

const CMenu = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('https://tch-nellify-2.onrender.com/c-programs');
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
            const response = await axios.get(`https://tch-nellify-2.onrender.com/c-programs/${id}`);
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
            <Navbar />
            <Box sx={{ padding: { xs: 1, sm: 2 }, width: '100%' }}>
                <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2, color: '#1e88e5', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                    C Programs
                </Typography>
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
                        mb: 4,
                        '& .MuiInputBase-root': {
                            borderRadius: 4,
                            backgroundColor: '#f1f1f1',
                            padding: '0 12px',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#1e88e5',
                            },
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                    }}
                />
                <Paper elevation={6} sx={{ padding: 2, borderRadius: 4, backgroundColor: '#fafafa' }}>
                    <Box
                        sx={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: 8,
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888',
                                borderRadius: 4,
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#555',
                            },
                        }}
                    >
                        <Grid container spacing={2}>
                            {filteredPrograms.map((program) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={program._id}>
                                    <Box
                                        onClick={() => handleListItemClick(program._id)}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: 2,
                                            cursor: 'pointer',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 4,
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                            backgroundColor: '#ffffff',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                                            },
                                        }}
                                    >
                                        <InsertDriveFileIcon sx={{ fontSize: { xs: 30, sm: 40, md: 50 }, color: '#1e88e5' }} />
                                        <Typography
                                            variant="body1"
                                            align="center"
                                            sx={{
                                                marginTop: 1,
                                                color: '#333333',
                                                fontWeight: 'bold',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                maxWidth: '100%',
                                                fontSize: { xs: '0.8rem', sm: '1rem' },
                                            }}
                                        >
                                            {program.title}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Paper>
            </Box>

            {selectedProgram && (
                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    maxWidth="md"
                    fullWidth
                    sx={{
                        '& .MuiPaper-root': {
                            borderRadius: 4,
                            padding: 2,
                            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
                        },
                        '& .MuiDialogTitle-root': {
                            backgroundColor: '#1e88e5',
                            color: 'white',
                            padding: '16px 24px',
                        },
                        '& .MuiDialogContent-root': {
                            padding: 2,
                        },
                    }}
                >
                    <DialogTitle>
                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            {selectedProgram.title}
                        </Typography>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="body1" gutterBottom sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {selectedProgram.description}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line', backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            <strong>Code:</strong> {selectedProgram.code}
                        </Typography>
                        <Divider sx={{ mb: 2, mt: 2 }} />
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line', backgroundColor: '#e8f5e9', padding: 2, borderRadius: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            <strong>Algorithm:</strong> {selectedProgram.algorithm}
                        </Typography>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default CMenu;
