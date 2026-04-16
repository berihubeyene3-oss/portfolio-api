const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMessages, createMessage } = require('../controllers/messageController');

// Public route (no authentication needed)
router.post('/', createMessage);

// Protected routes (authentication needed)
router.get('/', authMiddleware, getMessages);

module.exports = router;
