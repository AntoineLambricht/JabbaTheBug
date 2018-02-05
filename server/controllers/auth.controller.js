import passport from 'passport';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user.model';


function login(req, res) {
  
    passport.authenticate(['local','jwt'], {badRequestMessage: 'Username and password needed!', session: false }, function(err, user, info){
      var token;
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
      // If a user is found
      if(user){
        token = user.generateJwt();
        res.cookie("jwt",token)
        user.password = undefined;
        res.json(user);
        //TODO redirect to a page
        res.status(200);
      } else {
        // If user is not found
        res.clearCookie('jwt');
        //TODO redirect to login page
        res.status(401).json(info);
      }
    })(req, res);
  
  };

export default { login };