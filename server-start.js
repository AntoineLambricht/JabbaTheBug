process.env.NODE_ENV= process.env.NODE_ENV || 'development'
process.env.SERVER_PORT= process.env.SERVER_PORT || '4040'
process.env.MONGO_HOST='mongodb://localhost/mongohost'
process.env.MONGO_PORT='27017'
require('babel-register');
require("babel-polyfill");
require('./server');