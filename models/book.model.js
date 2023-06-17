const mongoose = require('mongoose');
const sanitizer = require('sanitize-html');


const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        set:(value) => sanitizer(value,{
            allowedTags:['b', 'i', 'p', 'strong', 'a'],
            allowedAttributes: {
                'a': ['href']
            },
            allowedIframeHostnames: ['www.youtube.com']
        })
    },
    coverPage:{
        type:String,
        required:true,
        set: (value)=> sanitizer(value,{
            allowedAttributes:{
                'a': ['href']
            }
        })
    },
    genre:String,
    reviews:[{
        type:String,
        ref:'User'
    }]
},
{
    timestamps:true
}
)

/**
 * @typedef {Book}
 */
const Book = mongoose.model('Book', bookSchema);
module.exports = Book
