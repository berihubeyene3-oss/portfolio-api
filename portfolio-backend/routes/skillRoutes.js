const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getSkills, createSkill } = require('../controllers/skillController');

// All skill routes need authentication
router.get('/', authMiddleware, getSkills);
router.post('/', authMiddleware, createSkill);

module.exports = router;
