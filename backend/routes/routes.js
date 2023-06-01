const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const postRoutes = require('./posts');
const feedbackRoutes = require('./feedback');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/feedback', feedbackRoutes);

module.exports = router;