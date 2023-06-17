const { verifyToken} = require("./token.service");
const { tokenTypes } = require("../config/tokens");
const {User, Token} = require("../models");
const {getUserbyEmail} = require('./user.services')
const {getUserbyId} = require('./user.services');
const { updateUserAfterVerify } = require("./user.services");


const isUserAdmin = async(email, password) => {
    if(email === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD)
        return true;
    return false;
}

const loginWithEmailandPassword = async(email, password) => {
    const user = await getUserbyEmail(email);
    if(!user || !(await user.isPasswordMatch(password))) {
        throw new Error("Incorrect email or password");
    }
    if(user.verified === false)
        throw new Error('user is not verified');
    return user;
}

const verifyEmail = async(token) => {
    try {
        const emailToken = await verifyToken(token,tokenTypes.VERIFY_EMAIL);
        const user = await getUserbyId(emailToken.user);
        if(!user)
            throw new Error("no user found");
        await Token.deleteMany({ user:user.id, type:tokenTypes.VERIFY_EMAIL });
        await updateUserAfterVerify(user);

    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    loginWithEmailandPassword,
    verifyEmail,
    isUserAdmin
}