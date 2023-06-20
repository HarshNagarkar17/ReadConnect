const httpStatus = require('http-status');
const passport = require('passport');


const authenticate = (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      })(req, res, next);
    })
      .then((user) => {
        // Authentication successful
        if(!user)
            throw new Error('please authenticate');
        req.user = user;
        next();
      })
      .catch((err) => {
        // Authentication failed
        res.status(httpStatus.UNAUTHORIZED).json({error:err.message})
      });
  };
  

module.exports = authenticate;