const { Book } = require('../models');
const _ = require('lodash')
const verifyImage = require('is-image-url');
const { bookGenre } = require('../config/bookGenres');

const saveBook = async (title, description, coverPage, genre) => {
    // genre = bookGenre[genre.toUpperCase()];
    const genreNumber = bookGenre[genre.toUpperCase()];
    console.log(genreNumber);
    if (genreNumber === undefined)
        throw new Error("Genre out of category");
    return Book.create({
        title,
        description,
        coverPage,
        genre: genreNumber
    })
}

function convertGenreToNumber(genreChoices) {
    const newGenres = genreChoices
      .map((genre) => {
        const normalizedGenre = genre.toUpperCase();
        if (bookGenre.hasOwnProperty(normalizedGenre)) {
          return bookGenre[normalizedGenre];
        }
        return null;
      })
      .filter((genre) => genre !== null);
    return newGenres;
  }

function searchFromGenre(genre){    // algorithm to compare the bestfit genre and return it's associated number
    const newgenre = [...genre];
     let prevLength = 0, genreIndex = 0;
     for (const key in bookGenre) {
        let length = 0;
        let eachBook = [...key];
        let index = 0;  
        
        while (index < newgenre.length && newgenre[index] === eachBook[index].toLowerCase()) {
            length = length + 1;
            console.log(eachBook[index]);
            index = index + 1;
        }
    
        if (length > prevLength) {
            prevLength = length; 
            genreIndex = bookGenre[key];
        }
    }

    return genreIndex;
}

const findBook = async (title, genre) => {

   const genreIndex = searchFromGenre(genre);

    // const genreNumber = bookGenre[genre.toUpperCase()];

    const booksFromTitle = await Book.find({ title: { $regex: title } });
    const booksFromGenre = await Book.find({ genre: genreIndex });

    return {
        booksFromTitle,
        booksFromGenre
    }

}
const isCoveranImage = async (url) => {
    // const response = await axios.head(url);
    // const contentType = response.headers['Content-Type'];
    // console.log('type:',contentType);
    // if(!contentType.startsWith('image/'))
    //     throw new Error("cover page must be of type Image");
    if (!verifyImage(url))
        throw new Error('cover page must be of type Image');
}

module.exports = {
    saveBook,
    isCoveranImage,
    findBook,
    searchFromGenre,
    convertGenreToNumber
}