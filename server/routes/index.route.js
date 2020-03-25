const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const skribblRoutes = require('./skribbl.route');
const fileRoutes = require('./file.route')

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/skribbl', skribblRoutes);
router.use('/file', fileRoutes);

module.exports = router;
