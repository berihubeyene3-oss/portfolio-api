const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mysql = require('mysql2');

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'portfolio_db'
}).promise();

// Test database route
app.get('/api/test-db', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT 1 as connected');
        res.json({
            success: true,
            message: 'Database connected!',
            result: result[0]
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Portfolio API is running',
        status: 'active'
    });
});

// Import routes (correct path - NO ..)
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const blogRoutes = require('./routes/blogRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/messages', messageRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`✅ Test: http://localhost:${PORT}/api/test-db`);
});