require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Create express app
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User model for authentication
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

// Load default credentials from .env
const defaultUsername = process.env.DEFAULT_USERNAME;
const defaultPassword = process.env.DEFAULT_PASSWORD;

// Validate credentials are loaded
if (!defaultUsername || !defaultPassword) {
    console.error('Error: DEFAULT_USERNAME or DEFAULT_PASSWORD not set in .env');
    process.exit(1);
}

// Authentication Routes
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    // Default credentials for demonstration purposes
    if (username === defaultUsername && password === defaultPassword) {
        req.session.user = { username };
        return res.status(200).send('Login successful');
    }
    // Real authentication
    const user = await User.findOne({ username, password });
    if (user) {
        req.session.user = { username };
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Unable to log out');
        }
        res.redirect('/login'); // Redirect to login page or another page after logout
    });
});

// Routes
const complaintsRouter = require('./routes/complaints');
app.use('/api/complaints', complaintsRouter);

// Serve complaints.html
app.get('/complaints', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'complaints.html'));
    } else {
        res.redirect('/login');
    }
});

// Serve complaints_view.html
app.get('/complaints/view', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'complaints_view.html'));
    } else {
        res.redirect('/login');
    }
});

// Serve login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});