import React from 'react';
import { Button, Box, Typography, Container, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleManageUsers = () => {
    navigate('/manage-users');
  };

  const handleManageBooks = () => {
    navigate('/manage-books');
  };

  const handleManagePrograms = () => {
    navigate('/manage-programs');
  };

  const handleManageNotes = () => {
    navigate('/manage-notes');
  };

  const handleManageTechNews = () => {
    navigate('/manage-tech-news');
  };

  return (
    <Container sx={{ marginTop: 1 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Admin Dashboard
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleManageUsers}
            >
              Manage Users
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleManageBooks}
            >
              Manage Books
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleManagePrograms}
            >
              Manage Programs
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={handleManageNotes}
            >
              Manage Notes
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleManageTechNews}
            >
              Manage Tech News
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Admin;
