const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { bookGenre } = require('../config/bookGenres');

const userSchema = mongoose.Schema({

    username:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        validate(value){
            if(!value.match(/\d/) || !value.match(/[a-zA-Z]/) || value.charAt(0) !== value.charAt(0).toUpperCase()) {
                throw new Error("Password is not strong")
            }
        }
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
    }
    ],
    genresLikedByUser:[{
        type:Number,
    }],
    isAdmin:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true,
}
);

/**
 * checks if email is already taken
 * @param {string} email
 * @returns {Promise<boolean>} 
 */
userSchema.statics.isEmailTaken = async function(email){
    const user = await this.findOne({email});
    return !!user;
}

/**
 * checks password match or not
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function(password) {
    const user = this;
    return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function(next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 10);
    next();
})
/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
