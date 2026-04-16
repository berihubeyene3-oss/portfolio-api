const { pool } = require('../config/db');

class SkillModel {
    // Get all skills
    static async getAllSkills() {
        const [rows] = await pool.query(`
            SELECT s.*, u.name as user_name 
            FROM skills s 
            LEFT JOIN users u ON s.user_id = u.id 
            ORDER BY s.level DESC, s.skill_name
        `);
        return rows;
    }

    // Get skills by user ID
    static async getSkillsByUserId(userId) {
        const [rows] = await pool.query(
            'SELECT * FROM skills WHERE user_id = ? ORDER BY level DESC',
            [userId]
        );
        return rows;
    }

    // Get skill by ID
    static async getSkillById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM skills WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // Create new skill
    static async createSkill(skillData) {
        const { user_id, skill_name, level } = skillData;
        const [result] = await pool.query(
            'INSERT INTO skills (user_id, skill_name, level) VALUES (?, ?, ?)',
            [user_id, skill_name, level || 0]
        );
        return result.insertId;
    }

    // Update skill
    static async updateSkill(id, skillData) {
        const { skill_name, level } = skillData;
        const [result] = await pool.query(
            'UPDATE skills SET skill_name = ?, level = ? WHERE id = ?',
            [skill_name, level, id]
        );
        return result.affectedRows;
    }

    // Delete skill
    static async deleteSkill(id) {
        const [result] = await pool.query('DELETE FROM skills WHERE id = ?', [id]);
        return result.affectedRows;
    }

    // Delete all skills by user ID
    static async deleteSkillsByUserId(userId) {
        const [result] = await pool.query('DELETE FROM skills WHERE user_id = ?', [userId]);
        return result.affectedRows;
    }

    // Get skill statistics
    static async getSkillStats() {
        const [rows] = await pool.query(`
            SELECT 
                COUNT(*) as total_skills,
                AVG(level) as avg_level,
                MAX(level) as max_level,
                MIN(level) as min_level
            FROM skills
        `);
        return rows[0];
    }
}

module.exports = SkillModel;