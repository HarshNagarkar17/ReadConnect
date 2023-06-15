const jwt = require('jsonwebtoken');
const { User, Token } = require('../models');
const moment = require('moment/moment');
const { tokenTypes } = require('../config/tokens');

/**
 * creates payload for token
 * @param {string} userId
 * @param {Moment} expiresIn
 * @returns {string}
 */
const createToken = (userId, expiresIn, secret = process.env.SECRET) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        expiresIn
    }

    return jwt.sign(payload, secret);
}

const verifyToken = async(token, type) => {
    const payload = jwt.verify(token, process.env.SECRET);
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
    if(!tokenDoc)
        throw new Error('No token found');
    return tokenDoc;
}

const saveToken = async (token, user, type, expires, blacklisted = false) => {
    Token.create({
        token,
        user,
        type,
        expires,
        blacklisted
    })
}
/**
 * generates auth tokens
 * @param {Object} user
 * @returns {Object} 
 */
const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(10, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
    const accessToken = createToken(user.id, accessTokenExpires);

    const refreshTokenExpires = moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss');
    const refreshToken = createToken(user.id, refreshTokenExpires);
    await saveToken(refreshToken, user.id, tokenTypes.REFRESH, refreshTokenExpires);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires
        }
    };

}

/**
 * @param {Object} user
 * @returns {String}
 */
const generateEmailToken = async (user) => {
    const emailTokenExpires = moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    const emailToken = createToken(user.id, emailTokenExpires);
    await saveToken(emailToken, user.id, tokenTypes.VERIFY_EMAIL, emailTokenExpires);
    return emailToken;
}
module.exports = {
    generateAuthTokens,
    verifyToken,
    generateEmailToken
}