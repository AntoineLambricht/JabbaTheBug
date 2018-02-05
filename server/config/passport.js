import config from './config';
import Promise from 'bluebird';
import User from '../models/user.model';
import { isMaster } from 'cluster';
 
//var User = require('../models/user.model');

var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function(passport){

  passport.use('local', new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password',
    },    
    function(login, password, done) {
      User.getWithLogin(login)
      .then((user) => {
        // Return if user not found in database
        if (!user) {
          return done(null, false, { message: 'Incorrect password or username' });
        }
        // Return if password is wrong
        user.comparePassword(password)
        .then(function(isMatch) {
          if (isMatch) {
              return done(null, user);
          } else {
              return done(null, false, { message: 'Incorrect password or username' });
          }
        })
      .catch(err =>{
        done(err)
      } );
      })
    }
  ))
  
  var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
  };
  
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
  opts.secretOrKey = config.jwtSecret;
  
  passport.use('jwt', new JwtStrategy(opts,
  
    function(jwt_payload, done) {
      var user = new User(jwt_payload)
      done(null,user);
  }));

}




