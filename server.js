const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_key';

mongoose.connect('mongodb://localhost:27017/insurance-db')
.then(()=>{
    console.log("connected to the database")
}).catch(()=>{
    console.log("failed")
})


const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const ClaimSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    amount: Number
});

const User = mongoose.model('User', UserSchema);
const Claim = mongoose.model('Claim', ClaimSchema);

app.use(cors());
app.use(express.json());

// Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Middleware to authenticate requests
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied');
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(400).send('Invalid token');
    }
};

// Create Claim
app.post('/claims', authMiddleware, async (req, res) => {
    const { title, description, amount } = req.body;
    const newClaim = new Claim({ userId: req.userId, title, description, amount });
    await newClaim.save();
    res.status(201).send('Claim created');
});

// Get Claims
app.get('/claims', authMiddleware, async (req, res) => {
    const claims = await Claim.find({ userId: req.userId });
    res.json(claims);
});

// Update Claim
app.put('/claims/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, amount } = req.body;
    await Claim.updateOne({ _id: id, userId: req.userId }, { title, description, amount });
    res.send('Claim updated');
});

// Delete Claim
app.delete('/claims/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    await Claim.deleteOne({ _id: id, userId: req.userId });
    res.send('Claim deleted');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
