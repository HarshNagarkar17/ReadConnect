const httpStatus = require("http-status");
const ApiError = require("../utils/error");

const errorHandler = async(err, req, res, next) => {
    let error = err;
    if(error instanceof ApiError) {
        return res.status(error.statusCode).json({err: error.message});
    }
    const message = error.message;
    const newError = new ApiError(httpStatus.BAD_REQUEST, message);
    return res.status(newError.statusCode).json({error:newError.message});
    }


module.exports = {errorHandler};