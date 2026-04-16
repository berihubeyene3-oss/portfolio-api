const { pool } = require('../config/db');

const getSkills = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM skills WHERE user_id = ? ORDER BY level DESC',
            [req.userId]
        );

        res.json({
            success: true,
            skills: rows
        });

    } catch (error) {
        console.error('Get skills error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const createSkill = async (req, res) => {
    try {
        const { skill_name, level } = req.body;

        if (!skill_name || level === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Skill name and level are required'
            });
        }

        const [result] = await pool.query(
            'INSERT INTO skills (user_id, skill_name, level) VALUES (?, ?, ?)',
            [req.userId, skill_name, level]
        );

        res.status(201).json({
            success: true,
            message: 'Skill created successfully',
            skillId: result.insertId
        });

    } catch (error) {
        console.error('Create skill error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = { getSkills, createSkill };
