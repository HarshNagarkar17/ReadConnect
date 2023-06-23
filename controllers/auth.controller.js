const User = require('../models/user.model');
const { authService, userService, tokenService, emailService } = require('../services');
const httpstatus = require('http-status');
const asyncWrapper = require('../utils/async');

exports.register = asyncWrapper(async (req, res) => {
    const { username, email, password, genreChoices } = req.body;
    console.log(req.headersDistinct);
    const user = await userService.createUser(username, email, password, genreChoices);
    return res.status(httpstatus.OK).json({ user });

});

exports.registerAdmin = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    const admin = await userService.createAdmin(email, password);
    return res.status(httpstatus.OK).json({ admin });

});

exports.login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    var admin = false;
    const user = await authService.loginWithEmailandPassword(email, password);
    const token = await tokenService.generateAuthTokens(user.id);
    if (user.isAdmin === true)
        admin = true
    return res.status(httpstatus.OK).json({ user, admin, token });

});


exports.sendVerificationEmail = asyncWrapper(async (req, res) => {
    const verifyEmailToken = await tokenService.generateEmailToken(req.body);
    emailService.sendVerificationEmail(req.body.to, verifyEmailToken);
    return res.json({ verifyEmailToken })
});


exports.verifyEmail = asyncWrapper(async (req, res) => {
    await authService.verifyEmail(req.query.token);
    return res.status(httpstatus.OK).send("verified");
});

exports.viewUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});
    return res.json({ users });
});
