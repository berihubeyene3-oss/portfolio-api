const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProjects, createProject } = require('../controllers/projectController');

// All project routes need authentication
router.get('/', authMiddleware, getProjects);
router.post('/', authMiddleware, createProject);

module.exports = router;
