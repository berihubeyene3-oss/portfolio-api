const { pool } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER - Create new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Check if user exists
        const [existing] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        // Generate token
        const token = jwt.sign(
            { userId: result.insertId, email: email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token: token,
            user: {
                id: result.insertId,
                name: name,
                email: email
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// LOGIN - Authenticate user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Get user
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const user = users[0];

        // Check password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// GET PROFILE
const getProfile = async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT id, name, email, profile_photo, bio, education, cv_url, created_at FROM users WHERE id = ?',
            [req.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {
        const { name, bio, education } = req.body;

        await pool.query(
            'UPDATE users SET name = ?, bio = ?, education = ? WHERE id = ?',
            [name || null, bio || null, education || null, req.userId]
        );

        res.json({
            success: true,
            message: 'Profile updated successfully'
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
// TEMPORARY - Test register via GET (browser only)
const testRegister = async (req, res) => {
    try {
        const { name, email, password } = req.query;

        if (!name || !email || !password) {
            return res.json({
                message: 'Use: /api/users/test?name=Tesfay&email=test@example.com&password=123456'
            });
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
            token: token,
            user: { id: result.insertId, name, email }
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
module.exports = { register, login, getProfile, updateProfile, testRegister };