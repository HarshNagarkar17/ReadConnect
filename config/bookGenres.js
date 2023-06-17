const tokenTypes = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    RESET_PASSWORD: 'resetPassword',
    VERIFY_EMAIL: 'verifyEmail'
};

const bookGenre = {
    BUSINESS: '1',
    INVESTING: '2',
    uppergenre(genre){
        return genre.toUpperCase();
    }
}

module.exports = {tokenTypes, bookGenre};