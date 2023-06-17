require('dotenv').config();
const express = require('express');
const { con } = require('./database/connect');
const server = express();
const cors = require('cors');


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true}));

server.use('/auth', require('./routers/auth.route'));
server.use('/', require('./routers/user.router'));
server.use('/book', require('./routers/book.route'));

const connection = async()=>{
    try {
        await con(process.env.URI);
        server.listen(process.env.PORT, ()=> console.log(`server on: ${process.env.PORT}`));
    } catch (error) {
        console.log(error);
    }
}

connection();