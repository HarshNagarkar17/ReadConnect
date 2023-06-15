const mongoose = require('mongoose');

const con = (url) => {
    mongoose.set('strictQuery', false);
    return mongoose.connect(url);
}
module.exports = {con};