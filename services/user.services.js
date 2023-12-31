const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/error');
const { convertGenreToNumber } = require('./book.service');
const jwt = require('jsonwebtoken');

const createUser = async (username, email, password, genres) => {
    if (await User.isEmailTaken(email))
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exist");
    // if (genres.length > 0) {
    //     const normalizedGenre = await convertGenreToNumber(genres);
    //     console.log(normalizedGenre);
    //     return User.create({ username, email, password, genresLikedByUser: normalizedGenre });
    // } else {
        return User.create({ username, email, password });

    // }
}

const createAdmin = async (email, password) => {
    if (await User.isEmailTaken(email))
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already in use");
    return User.create({ email, password, isAdmin: true, verified: true });
}

const updateUserAfterVerify = async (user) => {
    if (!(await getUserbyId(user.id)))
        throw new ApiError(httpStatus.BAD_REQUEST, "No user found to update");
    await User.findOneAndUpdate({ _id: user.id }, { verified: true });
}

const isUserAdmin = async (id) => {
    const user = await getUserbyId(id);
    if (!user.isAdmin)
        throw new Error("user is not an admin");
    //   throw new ApiError(httpStatus.BAD_REQUEST,"User is not an admin");
    return true;
}

const getUserbyEmail = (email) => {
    return User.findOne({ email });
}

const getUserProfile = async(token) => {
    const payload = jwt.verify(token, process.env.SECRET);
    if(!payload)
        throw new Error("No user found");
    const user = await getUserbyId(payload.sub);
    if(!user)
        throw new Error("no user found");
    return user;
}

const getUserbyId = (_id) => {
    return User.findById({ _id });
}
module.exports = {
    getUserbyEmail, createUser, getUserbyId,
    updateUserAfterVerify, createAdmin, isUserAdmin,getUserProfile
};