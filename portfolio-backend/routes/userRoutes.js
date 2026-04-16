const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

// REGISTER - POST
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        const token = jwt.sign(
            { userId: result.insertId, email: email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: { id: result.insertId, name, email }
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// LOGIN - POST
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password required' });
        }

        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, users[0].password);

        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: users[0].id, email: users[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: users[0].id, name: users[0].name, email: users[0].email }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// TEST REGISTER VIA GET (Browser only)
router.get('/test', async (req, res) => {
    try {
        const { name, email, password } = req.query;

        if (!name || !email || !password) {
            return res.json({ message: 'Use: /api/users/test?name=X&email=Y&password=Z' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        const token = jwt.sign(
            { userId: result.insertId, email: email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'User registered via browser!',
            token,
            user: { id: result.insertId, name, email }
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;