const { pool } = require('../config/db');

const getBlogs = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM blogs WHERE user_id = ? ORDER BY created_at DESC',
            [req.userId]
        );

        res.json({
            success: true,
            blogs: rows
        });

    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required'
            });
        }

        const [result] = await pool.query(
            'INSERT INTO blogs (user_id, title, content, tags) VALUES (?, ?, ?, ?)',
            [req.userId, title, content, tags || null]
        );

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            blogId: result.insertId
        });

    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = { getBlogs, createBlog };
