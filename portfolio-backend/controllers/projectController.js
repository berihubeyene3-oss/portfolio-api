const { pool } = require('../config/db');

// Get all projects
const getProjects = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
            [req.userId]
        );

        res.json({
            success: true,
            projects: rows
        });

    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get single project
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM projects WHERE id = ? AND user_id = ?',
            [id, req.userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            project: rows[0]
        });

    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create project
const createProject = async (req, res) => {
    try {
        const { title, description, technologies, github_link, demo_link } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }

        const [result] = await pool.query(
            `INSERT INTO projects (user_id, title, description, technologies, github_link, demo_link)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [req.userId, title, description, technologies || null, github_link || null, demo_link || null]
        );

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            projectId: result.insertId
        });

    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update project
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, technologies, github_link, demo_link } = req.body;

        const [existing] = await pool.query(
            'SELECT id FROM projects WHERE id = ? AND user_id = ?',
            [id, req.userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        await pool.query(
            `UPDATE projects SET title = ?, description = ?, technologies = ?, 
             github_link = ?, demo_link = ? WHERE id = ?`,
            [title, description, technologies, github_link, demo_link, id]
        );

        res.json({
            success: true,
            message: 'Project updated successfully'
        });

    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM projects WHERE id = ? AND user_id = ?',
            [id, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            message: 'Project deleted successfully'
        });

    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
