// const multer = require('multer');
const { addBook } = require('../controllers/book.controller');

const router = require('express').Router();

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './covers')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname)
//     }
// });

// const upload = multer.upload({storage});

router.post('/add-book', addBook);


module.exports = router;