const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const fs = require('fs');


const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

// router.route('/').post(asyncHandler(insert));
router.get('/download', asyncHandler(download));


async function download() {
    
}