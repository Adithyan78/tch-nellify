import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid, CardActions, Container } from '@mui/material';
import axios from 'axios';

const Books = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleImageClick = (googleDriveLink) => {
    window.open(googleDriveLink, '_blank'); 
  };

  return (
    <Container sx={{
      paddingTop: { xs: '2700px', sm: '0px' }, // Increase padding top for mobile screens
      marginTop: { xs: '0', sm: '600px' } // Adjust top margin for mobile screens if needed
    }}> 
      {loading ? (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {documents.map((document) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={document._id}>
              <Card 
                sx={{ 
                  backgroundColor: 'white', 
                  borderRadius: 2, 
             
                  boxShadow: 3, 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.2s ease-in-out', 
                  '&:hover': {
                    transform: 'scale(1.05)', 
                  } 
                }}
              >
                <CardMedia
                  component="img"
                  height="200" 
                  image={document.image || 'https://via.placeholder.com/300'}
                  alt="Document"
                  sx={{ cursor: 'pointer', objectFit: 'cover' }} 
                  onClick={() => handleImageClick(document.googleDriveLink)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
                    {document.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {document.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleImageClick(document.googleDriveLink)}>View</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Books;
