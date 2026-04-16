const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getBlogs, createBlog } = require('../controllers/blogController');

// All blog routes need authentication
router.get('/', authMiddleware, getBlogs);
router.post('/', authMiddleware, createBlog);

module.exports = router;
