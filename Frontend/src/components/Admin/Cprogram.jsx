import React, { useState, useEffect } from 'react';
import {
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
    Grid,
    Card,
    CardContent,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Collapse
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Navbar3 from './NavBar3';

const CPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [algorithm, setAlgorithm] = useState('');
    const [programs, setPrograms] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [addProgramDialogOpen, setAddProgramDialogOpen] = useState(false);
    const [expandedProgramId, setExpandedProgramId] = useState(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('https://tch-nellify-2.onrender.com/c-programs');
                setPrograms(response.data);
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };

        fetchPrograms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const programData = { title, description, code, algorithm };

        try {
            if (selectedProgram) {
                // Update existing program
                await axios.put(`https://tch-nellify-2.onrender.com/c-programs/${selectedProgram._id}`, programData);
                setSnackbarMessage('Program updated successfully!');
            } else {
                // Add new program
                await axios.post('https://tch-nellify-2.onrender.com/c-programs', programData);
                setSnackbarMessage('Program added successfully!');
            }
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTitle('');
            setDescription('');
            setCode('');
            setAlgorithm('');
            setSelectedProgram(null); // Clear selection
            setDialogOpen(false); // Close dialog
            setAddProgramDialogOpen(false); // Close add program dialog
            // Fetch updated list
            const response = await axios.get('https://tch-nellify-2.onrender.com/c-programs');
            setPrograms(response.data);
        } catch (error) {
            setSnackbarMessage('Error saving program!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleEdit = (program) => {
        setSelectedProgram(program);
        setTitle(program.title);
        setDescription(program.description);
        setCode(program.code);
        setAlgorithm(program.algorithm);
        setDialogOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tch-nellify-2.onrender.com/c-programs/${id}`);
            setSnackbarMessage('Program deleted successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            // Fetch updated list
            const response = await axios.get('https://tch-nellify-2.onrender.com/c-programs');
            setPrograms(response.data);
        } catch (error) {
            setSnackbarMessage('Error deleting program!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setAddProgramDialogOpen(false);
        setSelectedProgram(null);
        setTitle('');
        setDescription('');
        setCode('');
        setAlgorithm('');
    };

    const handleAddProgramButtonClick = () => {
        setAddProgramDialogOpen(true);
    };

    const handleExpandClick = (id) => {
        setExpandedProgramId(expandedProgramId === id ? null : id);
    };

    return (
        <>
            <Navbar3 onAddClick={handleAddProgramButtonClick} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh', // Make the container fill the full height
                padding: '16px',
                boxSizing: 'border-box'
            }}>
                <Grid container spacing={1} style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {programs.map((program) => (
                        <Grid item xs={12} sm={6} md={4}mt={7} key={program._id}>
                            <Card style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '16px',
                                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                                borderRadius: '20px',
                                height: '100%', // Ensure cards fill the available space
                                transition: 'transform 0.2s',
                                cursor: 'pointer',
                                ':hover': {
                                    transform: 'scale(1.02)'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                        {program.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {program.description}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ marginTop: '16px' }}
                                        onClick={() => handleExpandClick(program._id)}
                                        endIcon={expandedProgramId === program._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    >
                                        {expandedProgramId === program._id ? 'Hide Details' : 'View Details'}
                                    </Button>
                                    <Collapse in={expandedProgramId === program._id}>
                                        <Typography variant="body2" style={{ marginTop: '16px', whiteSpace: 'pre-wrap' }}>
                                            <strong>Code:</strong>
                                            <pre>{program.code}</pre>
                                        </Typography>
                                        <Typography variant="body2" style={{ marginTop: '16px', whiteSpace: 'pre-wrap' }}>
                                            <strong>Algorithm:</strong>
                                            <pre>{program.algorithm}</pre>
                                        </Typography>
                                    </Collapse>
                                </CardContent>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '8px' }}>
                                    <IconButton onClick={() => handleEdit(program)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(program._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    style={{ zIndex: 1300 }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                {(dialogOpen || addProgramDialogOpen) && (
                    <Dialog
                        open={dialogOpen || addProgramDialogOpen}
                        onClose={handleDialogClose}
                        maxWidth="md"
                        fullWidth
                        style={{ 
                            borderRadius: '20px', 
                            padding: '16px',
                            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <DialogTitle style={{ backgroundColor: '#1976d2', color: 'white' }}>
                            <Typography variant="h6">{selectedProgram ? 'Edit Program' : 'Add Program'}</Typography>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="body1" gutterBottom>
                                {selectedProgram ? 'Edit the details of the program' : 'Add a new program'}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Code"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        margin="normal"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Algorithm"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        margin="normal"
                                        value={algorithm}
                                        onChange={(e) => setAlgorithm(e.target.value)}
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                style={{ marginRight: '8px' }}
                            >
                                {selectedProgram ? 'Update Program' : 'Add Program'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleDialogClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Dialog>
                )}
            </div>
        </>
    );
};

export default CPage;
