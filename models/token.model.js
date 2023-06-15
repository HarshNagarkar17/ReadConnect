const mongoose = require('mongoose');
const {tokenTypes} = require('../config/tokens')
const tokenSchema = mongoose.Schema({
    
    token: {
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum:[tokenTypes.ACCESS, tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
        required:true
    },
    expires:{
        type:String,
        required:true
    },
    blacklisted:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
)

/**
 * @typedef {Token}
 */
const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;