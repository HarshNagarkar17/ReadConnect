const { userService, bookService } = require('../services')
const httpStatus = require('http-status');
const _ = require('lodash');
const { Book } = require('../models');
const asyncWrapper = require('../utils/async');

/**
 * add a book
 * @param {String} title
 * @param {String} description
 * @param {String} coverPage
 * @param {String} userId
 * @param {String} genre
 * @returns {Object}
 */
exports.addBook = asyncWrapper(async (req, res, next) => {
    const { title, description, coverPage, userId, genre } = _.pick(req.body, ['title', 'description', 'coverPage', 'userId', 'genre'])
    await bookService.isCoveranImage(coverPage);
    await userService.isUserAdmin(userId);
    const book = await bookService.saveBook(title, description, coverPage, genre);
    return res.status(httpStatus.OK).json({ book });

})

/**
 * search books from title and genre
 * @param {String} title
 * @param {String} genre
 * @returns {Object}
 */
exports.searchBook =asyncWrapper(async(req, res) => {
    
        const { title, genre } = req.query;
        // find books function
        const books = await bookService.findBook(title, genre);
        const { booksFromTitle, booksFromGenre } = books;
        if (booksFromGenre.length > booksFromTitle.length)   // one with high length, display first
            return res.status(httpStatus.OK).json({ booksFromGenre, booksFromTitle });
        return res.status(httpStatus.OK).json({ booksFromTitle, booksFromGenre })
   
})


exports.getAll =asyncWrapper(async (req, res) => {
  
        const books = await Book.find({});
        res.status(httpStatus.OK).json({ books });
   
});