process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.SERVER_PORT = process.env.SERVER_PORT || '4040'
process.env.MONGO_HOST = 'mongodb://ubuntu.tircher.be'
process.env.MONGO_PORT = '27020'
require('babel-register');
require("babel-polyfill");
require('./server');
