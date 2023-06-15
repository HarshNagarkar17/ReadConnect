const User = require('../models/user.model');
const {authService, userService, tokenService, emailService} = require('../services');
const httpstatus = require('http-status');

exports.register = async(req, res) => {
    const {username, email, password} = req.body;
    console.log(req.headersDistinct);   
    const user = await userService.createUser(username, email, password);
    return res.status(httpstatus.OK).json({user});
}

exports.login = async(req, res) => {
    const {email, password} = req.body;
    const user = await authService.loginWithEmailandPassword(email, password);
    const token = await tokenService.generateAuthTokens(user);
    return res.status(httpstatus.OK).json({user, token});
}


exports.sendVerificationEmail = async(req, res) => {
    await authService.isUserAlreadyVerified(req.body.id);
    const verifyEmailToken = await tokenService.generateEmailToken(req.body);
    const mail = emailService.sendVerificationEmail(req.body.to, verifyEmailToken);
    return res.json({mail})
}


exports.verifyEmail = async(req, res) => {
    await authService.verifyEmail(req.query.token);
    return res.status(httpstatus.OK).send();
}

exports.viewUsers = async(req, res) => {
    const users = await User.find({});
    return res.json({users});
}

