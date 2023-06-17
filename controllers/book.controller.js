const { userService, bookService } = require('../services')
const httpStatus = require('http-status');
const _ = require('lodash');

exports.addBook = async (req, res) => {
    const { title, description, coverPage, userId, genre } = _.pick(req.body, ['title', 'description', 'coverPage', 'userId', 'genre'])
    try {
        await bookService.isCoveranImage(coverPage);
        await userService.isUserAdmin(userId);
        const book = await bookService.saveBook(title, description, coverPage, genre);
        return res.status(httpStatus.OK).json({ book });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({error:error.message});
    }
}


