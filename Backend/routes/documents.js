const express = require('express');
const router = express.Router();
const Document = require('../models/Document'); // Assuming you have a Document model

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error });
  }
});

// Create a new document
router.post('/', async (req, res) => {
  const { title, description, googleDriveLink, image } = req.body;
  try {
    const newDocument = new Document({ title, description, googleDriveLink, image });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error creating document', error });
  }
});

// Update a document
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, googleDriveLink, image } = req.body;
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      id,
      { title, description, googleDriveLink, image },
      { new: true }
    );
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document', error });
  }
});

// Delete a document
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Document.findByIdAndDelete(id);
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error });
  }
});

module.exports = router;
