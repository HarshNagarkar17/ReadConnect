const {Book} = require('../models');
const _ = require('lodash')
const verifyImage = require('is-image-url');
const {bookGenre} = require('../config/bookGenres');

const saveBook = async(title, description, coverPage, genre) => {
    // genre = bookGenre[genre.toUpperCase()];
    const genreNumber = bookGenre[genre.toUpperCase()];
    return Book.create({
        title, 
        description,
        coverPage,
        genre: genreNumber
    })
}

const isCoveranImage = async(url) => {
    // const response = await axios.head(url);
    // const contentType = response.headers['Content-Type'];
    // console.log('type:',contentType);
    // if(!contentType.startsWith('image/'))
    //     throw new Error("cover page must be of type Image");
    if(!verifyImage(url))
        throw new Error('cover page must be of type Image');
}

module.exports = {
    saveBook,
    isCoveranImage
}