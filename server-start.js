process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.SERVER_PORT = process.env.SERVER_PORT || '4040'
process.env.JWT_SECRET = 'tQ2OBiFaUztODWbZ3Q135nBjlFzjMhuSSLMGq6ko4u'
process.env.MONGO_HOST = 'mongodb://ubuntu.tircher.be'
process.env.MONGO_PORT = '27020'
process.env.MONGODB_URI = process.env.MONGO_HOST + ':' + process.env.MONGO_PORT
require('babel-register');
require("babel-polyfill");
require('./server');
