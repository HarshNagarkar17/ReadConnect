const User = require('../models/user.model');
const { authService, userService, tokenService, emailService } = require('../services');
const httpstatus = require('http-status');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.headersDistinct);
    const user = await userService.createUser(username, email, password);
    return res.status(httpstatus.OK).json({ user });
}

exports.registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    const admin = await userService.createAdmin(username, email, password);
    return res.status(httpstatus.OK).json({ admin });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    // if (await authService.isUserAdmin(email, password)) {
    //     const admin = await userService.getUserbyEmail(email);
    // }
    var admin = false;
    const user = await authService.loginWithEmailandPassword(email, password);
    const token = await tokenService.generateAuthTokens(user.id);
    if(user.isAdmin === true)
        admin = true
    return res.status(httpstatus.OK).json({ user, admin, token });
}


exports.sendVerificationEmail = async (req, res) => {
    const verifyEmailToken = await tokenService.generateEmailToken(req.body);
    emailService.sendVerificationEmail(req.body.to, verifyEmailToken);
    return res.json({ verifyEmailToken })
}


exports.verifyEmail = async (req, res) => {
    await authService.verifyEmail(req.query.token);
    return res.status(httpstatus.OK).send("verified");
}

exports.viewUsers = async (req, res) => {
    const users = await User.find({});
    return res.json({ users });
}

