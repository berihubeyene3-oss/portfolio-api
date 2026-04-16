const { pool } = require('../config/db');

const getMessages = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM messages ORDER BY created_at DESC'
        );

        res.json({
            success: true,
            messages: rows
        });

    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and message are required'
            });
        }

        const [result] = await pool.query(
            'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            messageId: result.insertId
        });

    } catch (error) {
        console.error('Create message error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = { getMessages, createMessage };
