import React, { useState } from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import CMenuUser from './CMenuUser'; // Import CMenu component
import PythonMenuUser from './PythonMenuUser'; // Import PythonMenu component

const ProgramsUser = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleButtonClick = (language) => {
        setSelectedLanguage(language);
    };

    const renderCodeContent = () => {
        switch (selectedLanguage) {
            case 'C':
                return <CMenuUser />; // Render CMenu component for C programs
            case 'Python':
                return <PythonMenuUser />; // Render PythonMenu component for Python programs
            case 'JAVA':
                return <Typography sx={{ color: 'black' }}>Code for JAVA</Typography>;
            default:
                return  <CMenuUser />; 
        }
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item sx={{ 
                width: '250px', 
                position: 'fixed', 
                top: '65px', // Adjust based on your navbar height
                left: 0, // Align the sidebar to the left
                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                padding: 2, 
                boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.9)', 
                zIndex: 1000, 
                height: 'calc(100vh - 65px)' // Adjust based on your navbar height
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
            <Grid item sx={{ 
                flexGrow: 1, 
                paddingTop: 5,
                paddingLeft:0, 
                marginLeft: '-120px', // Adjust margin to account for the fixed menu width
                overflowY: 'auto' 
            }}>
                {renderCodeContent()}
            </Grid>
        </Grid>
    );
};

export default ProgramsUser;
