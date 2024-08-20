import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar2 from './NavBar2';

const ManageBooks = () => {
  // State and effect hooks
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [image, setImage] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://tch-nellify-2.onrender.com/api/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Handlers for dialog opening and closing
  const handleClickOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    // Reset form fields
    setTitle('');
    setDescription('');
    setGoogleDriveLink('');
    setImage('');
  };
  const handleClickOpenEdit = (document) => {
    setCurrentDocument(document);
    setTitle(document.title);
    setDescription(document.description);
    setGoogleDriveLink(document.googleDriveLink);
    setImage(document.image);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    // Reset form fields
    setTitle('');
    setDescription('');
    setGoogleDriveLink('');
    setImage('');
    setCurrentDocument(null);
  };

  // Handlers for form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tch-nellify-2.onrender.com/api/documents', {
        title,
        description,
        googleDriveLink,
        image,
      });
      console.log(response.data);
      handleCloseAdd();
      // Refetch documents
      const updatedResponse = await axios.get('https://tch-nellify-2.onrender.com/api/documents');
      setDocuments(updatedResponse.data);
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || 'An error occurred');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://tch-nellify-2.onrender.com/api/documents/${currentDocument._id}`, {
        title,
        description,
        googleDriveLink,
        image,
      });
      console.log(response.data);
      handleCloseEdit();
      // Refetch documents
      const updatedResponse = await axios.get('https://tch-nellify-2.onrender.com/api/documents');
      setDocuments(updatedResponse.data);
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || 'An error occurred');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tch-nellify-2.onrender.com/api/documents/${id}`);
      // Remove deleted document from state
      setDocuments(documents.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document');
    }
  };

  return (
    <div>
      <Navbar2 onAddClick={handleClickOpenAdd} />

      {/* Add Document Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Google Drive Link"
              type="url"
              fullWidth
              variant="outlined"
              value={googleDriveLink}
              onChange={(e) => setGoogleDriveLink(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Image URL"
              type="url"
              fullWidth
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <DialogActions>
              <Button onClick={handleCloseAdd} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Document Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Google Drive Link"
              type="url"
              fullWidth
              variant="outlined"
              value={googleDriveLink}
              onChange={(e) => setGoogleDriveLink(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Image URL"
              type="url"
              fullWidth
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Box
        sx={{
          padding: 2,
          marginTop: '500px', // Adjust margin to place below the navbar
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3, // Space between cards
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
                borderRadius: 2, // Rounded corners
                boxShadow: 3, // Add some shadow for better visibility
                transition: 'transform 0.2s ease-in-out', // Add transition
                '&:hover': {
                  transform: 'scale(1.05)', // Add hover effect
                } 
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={document.image || 'https://via.placeholder.com/300'}
                alt="Document"
                sx={{ width: '100%', height: '45vh' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {document.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {document.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={document.googleDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClickOpenEdit(document)}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(document._id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </div>
  );
};

export default ManageBooks;
