import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../config/config';
import passport from '../config/passport';


const router = express.Router();

route.route('/login')
        .post(validate(paramValidation.login), authCtrl.login);

export default routeur;
