// const multer = require('multer');
const { addBook, searchBook, getAll } = require('../controllers/book.controller');

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
router.get('/search-book', searchBook);
router.get('/books', getAll);

module.exports = router;