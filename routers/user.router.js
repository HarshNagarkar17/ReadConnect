const router = require('express').Router();
const { viewUsers } = require('../controllers/auth.controller');


router.get('/users', viewUsers);


module.exports = router;