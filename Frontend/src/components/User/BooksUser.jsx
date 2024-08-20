import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardActions, CardMedia, Button } from '@mui/material';
import axios from 'axios';

const BooksUser = () => {
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
    <div>
      <Box
        sx={{
          padding: 2,
          marginTop: '200px', 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3, 
          justifyContent: 'flex-start'
        }}
      >
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          documents.map((document) => (
            <Card 
              key={document._id}
              sx={{ 
                backgroundColor: 'white', 
                position: 'relative', 
                maxWidth: 240, 
                margin: 2, 
                borderRadius: 2, 
                boxShadow: 3, 
                transition: 'transform 0.2s ease-in-out', 
                '&:hover': {
                  transform: 'scale(1.05)', 
                } 
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={document.image || 'https://via.placeholder.com/300'}
                alt="Document"
                sx={{ width: '100%', height: '45vh', cursor: 'pointer' }} 
                onClick={() => handleImageClick(document.googleDriveLink)}
              />
            </Card>
          ))
        )}
      </Box>
    </div>
  );
};

export default BooksUser;
