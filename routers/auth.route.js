const { register, login, verifyEmail, sendVerificationEmail, registerAdmin } = require("../controllers/auth.controller");
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/register', register);
router.post('/login', login);
router.get('/send-email', sendVerificationEmail);
router.get('/secure',passport.authenticate('jwt', {session:false}), async(req, res) => {
    res.send('view secure')
})
router.get('/verify-email', verifyEmail);
router.post('/register-admin', registerAdmin);


module.exports = router;