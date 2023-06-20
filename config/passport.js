const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const secret = process.env.SECRET;
const { tokenTypes } = require('./tokens')
const { User } = require('../models');
const moment = require('moment');

const jwtOptions = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss');
        if (payload.type !== tokenTypes.ACCESS || payload.expiresIn < currentDate)
            throw new Error("Invaid user");
        const user = await User.findOne({ _id: payload.sub });
        if (user)
            return done(null, user);
        else
            return (null, false)
    } catch (error) {
        done(error, false);
    }
}

const jwtStratergy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStratergy
}