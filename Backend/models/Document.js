const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  googleDriveLink: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Document', documentSchema);
