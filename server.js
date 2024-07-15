const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://vkvinaykumar391:94vNXbIuMKIcQfJR@complaintregister.nxlzoej.mongodb.net/?retryWrites=true&w=majority&appName=complaintregister', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
const complaintsRouter = require('./routes/complaints');
app.use('/api/complaints', complaintsRouter);

// Serve complaints.html
app.get('/complaints', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'complaints.html'));
});

// Serve complaints_view.html
app.get('/complaints/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'complaints_view.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
