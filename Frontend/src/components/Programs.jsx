import React, { useState } from 'react';
import { Typography, Button, Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import CMenu from './CMenu'; // Import CMenu component
import PythonMenu from './PythonMenu'; // Import PythonMenu component
import JavaMenu from './JavaMenu';

const Programs = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if the screen is mobile size

    const handleButtonClick = (language) => {
        setSelectedLanguage(language);
        if (isMobile) {
            setSidebarVisible(false); // Hide sidebar on mobile after selection
        }
    };

    const renderCodeContent = () => {
        switch (selectedLanguage) {
            case 'C':
                return <CMenu />; // Render CMenu component for C programs
            case 'Python':
                return <PythonMenu />; // Render PythonMenu component for Python programs
            case 'JAVA':
                return <JavaMenu />;
            default:
                return <CMenu />; 
        }
    };

    return (
        <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
            {sidebarVisible && (
                <Grid item xs={12} md={3} sx={{ 
                    position: { md: 'fixed', xs: 'relative' }, // Fixed on larger screens, relative on mobile
                    top: 0, 
                    left: 0, 
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                    padding: 2, 
                    boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.9)', 
                    zIndex: 1000, 
                    height: '100vh',
                    display: { xs: 'block', md: 'block' } // Ensure it displays on mobile and larger screens
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
                            Select Language
                        </Typography>
                        <Button
                            onClick={() => handleButtonClick('C')}
                            sx={{
                                width: '100%',
                                backgroundColor: selectedLanguage === 'C' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                color: selectedLanguage === 'C' ? 'black' : 'white',
                                border: '1px solid white',
                                borderRadius: 1,
                                padding: '8px',
                                marginBottom: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderColor: 'white',
                                },
                            }}
                        >
                            C
                        </Button>
                        <Button
                            onClick={() => handleButtonClick('Python')}
                            sx={{
                                width: '100%',
                                backgroundColor: selectedLanguage === 'Python' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                color: selectedLanguage === 'Python' ? 'black' : 'white',
                                border: '1px solid white',
                                borderRadius: 1,
                                padding: '8px',
                                marginBottom: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderColor: 'white',
                                },
                            }}
                        >
                            Python
                        </Button>
                        <Button
                            onClick={() => handleButtonClick('JAVA')}
                            sx={{
                                width: '100%',
                                backgroundColor: selectedLanguage === 'JAVA' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                color: selectedLanguage === 'JAVA' ? 'black' : 'white',
                                border: '1px solid white',
                                borderRadius: 1,
                                padding: '8px',
                                marginBottom: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderColor: 'white',
                                },
                            }}
                        >
                            JAVA
                        </Button>
                    </Box>
                </Grid>
            )}
            <Grid item xs={12} md={9} sx={{ 
                flexGrow: 1, 
                padding: 3, 
                marginLeft: { md: '250px', xs: '0' }, // Adjust margin to account for the sidebar
                marginTop: { md: '0', xs: '60px' }, // Adjust margin for mobile
                overflowY: 'auto' 
            }}>
                {renderCodeContent()}
            </Grid>
        </Grid>
    );
};

export default Programs;
