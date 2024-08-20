import React from 'react';
import { Button, Box, Typography, Container, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ManageCode = () => {
  const navigate = useNavigate();

  const handleManageC = () => {
    navigate('/cpage');
  };

  const handleManagePython = () => {
    navigate('/pypage');
  };

  const handleManageJava = () => {
    navigate('/javapage');
  };

  

  return (
    <Container sx={{ marginTop: 1 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Manage Code
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleManageC}
            >
              C 
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleManagePython}
            >
             PYTHON
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleManageJava}
            >
              JAVA
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ManageCode;
