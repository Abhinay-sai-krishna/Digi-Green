const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using https
}));

mongoose.connect('mongodb://localhost:27017/digigreen', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

// Signup route
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    req.session.username = username;
    res.json({ success: true, username });
});

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false });
    req.session.username = username;
    res.json({ success: true, username });
});

// Get current user
app.get('/api/user', (req, res) => {
    if (req.session.username) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));