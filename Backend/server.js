const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const documentRoutes = require('./routes/documents');


// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://techcodehub2024:1234@cluster0.8mc5s56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define MongoDB schema for users
const userSchema = new mongoose.Schema({
  uid: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatar: { type: String },
  loginTime: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);

// Define MongoDB schema for C programs
const cProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  algorithm: { type: String, required: true }, // New field for algorithm
});
const CProgram = mongoose.model('CProgram', cProgramSchema);

//Define MongoDB schema for python programs

const PythonProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  algorithm: { type: String, required: true }, // New field for algorithm
});
const PythonProgram = mongoose.model('PythonProgram', PythonProgramSchema);

////Define MongoDB schema for java programs

const javaProgramSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  algorithm: String
});
const JavaProgram = mongoose.model('JavaProgram', javaProgramSchema);



// Endpoint to handle email and password login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ uid: user._id, email: user.email, isAdmin: user.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Endpoint to handle Google Sign-In
app.post('/login/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, picture: avatar, name } = decodedToken;
    const isAdmin = email === 'techcodehub.2024@gmail.com';

    const user = await User.findOneAndUpdate(
      { uid },
      { uid, email, name, avatar, isAdmin },
      { upsert: true, new: true }
    );

    const jwtToken = jwt.sign({ uid: user.uid, email: user.email, isAdmin: user.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token: jwtToken, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
});

// Endpoint to handle password reset
app.post('/resetPassword', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email required' });
  }

  try {
    // Implement password reset functionality here
    res.status(200).json({ message: 'Password reset functionality not yet implemented' });
  } catch (error) {
    res.status(500).json({ message: 'Error handling password reset', error });
  }
});

// Endpoint to create a new user (for sign-up)
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const isAdmin = email === 'techcodehub.2024@gmail.com';
    const user = new User({ name, email, password: hashedPassword, isAdmin });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// Document routes
app.use('/api/documents', documentRoutes);

// Endpoint to get all C programs
app.get('/c-programs', async (req, res) => {
  try {
    const programs = await CProgram.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching C programs', error });
  }
});

// Endpoint to get a specific C program by ID
app.get('/c-programs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const program = await CProgram.findById(id);
    if (!program) {
      return res.status(404).json({ message: 'C program not found' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching C program', error });
  }
});

// Endpoint to add a new C program
app.post('/c-programs', async (req, res) => {
  const { title, description, code, algorithm } = req.body;

  if (!title || !description || !code || !algorithm) {
    return res.status(400).json({ message: 'Title, description, code, and algorithm required' });
  }

  try {
    const newProgram = new CProgram({ title, description, code, algorithm });
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(500).json({ message: 'Error creating C program', error });
  }
});

// Endpoint to update a C program
app.put('/c-programs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, code, algorithm } = req.body;

  try {
    const program = await CProgram.findByIdAndUpdate(id, { title, description, code, algorithm }, { new: true });
    if (!program) {
      return res.status(404).json({ message: 'C program not found' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error updating C program', error });
  }
});

// Endpoint to delete a C program
app.delete('/c-programs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const program = await CProgram.findByIdAndDelete(id);
    if (!program) {
      return res.status(404).json({ message: 'C program not found' });
    }
    res.status(200).json({ message: 'C program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting C program', error });
  }
});

app.get('/c-programs', async (req, res) => {
  try {
      const searchTerm = req.query.search || ''; // Get the search term from query parameters
      const programs = await Program.find({
          title: { $regex: searchTerm, $options: 'i' } // Case-insensitive search
      });
      res.json(programs);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Get a specific program by ID
app.get('/c-programs/:id', async (req, res) => {
  try {
      const program = await Program.findById(req.params.id);
      if (!program) return res.status(404).json({ message: 'Program not found' });
      res.json(program);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



app.get('/python-programs', async (req, res) => {
  try {
    const programs = await PythonProgram.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Python programs', error });
  }
});

// Endpoint to get a specific Python program by ID
app.get('/python-programs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const program = await PythonProgram.findById(id);
    if (!program) {
      return res.status(404).json({ message: 'Python program not found' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Python program', error });
  }
});

// Endpoint to add a new Python program
app.post('/python-programs', async (req, res) => {
  const { title, description, code, algorithm } = req.body;

  if (!title || !description || !code || !algorithm) {
    return res.status(400).json({ message: 'Title, description, code, and algorithm required' });
  }

  try {
    const newProgram = new PythonProgram({ title, description, code, algorithm });
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Python program', error });
  }
});

// Endpoint to update a Python program
app.put('/python-programs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, code, algorithm } = req.body;

  try {
    const program = await PythonProgram.findByIdAndUpdate(id, { title, description, code, algorithm }, { new: true });
    if (!program) {
      return res.status(404).json({ message: 'Python program not found' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Python program', error });
  }
});

// Endpoint to delete a Python program
app.delete('/python-programs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const program = await PythonProgram.findByIdAndDelete(id);
    if (!program) {
      return res.status(404).json({ message: 'Python program not found' });
    }
    res.status(200).json({ message: 'Python program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Python program', error });
  }
});


// Search endpoint for Python programs
app.get('/python-programs', async (req, res) => {
  try {
    const searchTerm = req.query.search || ''; // Get the search term from query parameters
    const programs = await Program.find({
      title: { $regex: searchTerm, $options: 'i' } // Case-insensitive search
    });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific Python program by ID
app.get('/python-programs/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get all Java programs
app.get('/java-programs', async (req, res) => {
  try {
    const programs = await JavaProgram.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Java programs', error });
  }
});

// Get a specific Java program by ID
app.get('/java-programs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const program = await JavaProgram.findById(id);
    if (!program) {
      return res.status(404).json({ message: 'Java program not found' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Java program', error });
  }
});

// Add a new Java program
app.post('/java-programs', async (req, res) => {
  const { title, description, code, algorithm } = req.body;

  if (!title || !description || !code || !algorithm) {
    return res.status(400).json({ message: 'Title, description, code, and algorithm required' });
  }

  try {
    const newProgram = new JavaProgram({ title, description, code, algorithm });
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Java program', error });
  }
});

// Update a Java program
app.put('/java-programs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, code, algorithm } = req.body;

  try {
    const program = await JavaProgram.findByIdAndUpdate(id, { title, description, code, algorithm }, { new: true });
    if (!program) {
      return res.status(404).json({ message: 'Java program not found' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Java program', error });
  }
});

// Delete a Java program
app.delete('/java-programs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const program = await JavaProgram.findByIdAndDelete(id);
    if (!program) {
      return res.status(404).json({ message: 'Java program not found' });
    }
    res.status(200).json({ message: 'Java program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Java program', error });
  }
});

// Search Java programs
app.get('/java-programs', async (req, res) => {
  try {
    const searchTerm = req.query.search || ''; // Get the search term from query parameters
    const programs = await JavaProgram.find({
      title: { $regex: searchTerm, $options: 'i' } // Case-insensitive search
    });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Admin-specific routes for user management
app.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, 'uid name email avatar loginTime');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.get('/admin/users/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid }, 'name email avatar loginTime');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

app.delete('/admin/users/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    await User.findOneAndDelete({ uid });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
