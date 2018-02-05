import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import compress from 'compression';
import helmet from 'helmet';
import path from 'path';
import appRoot from 'app-root-path';
import expressWinston from 'express-winston';

import config from './config';
import routes from '../routes/index.route';
import winstonInstance from './winston';


const app = express();

//MIDELWARES

//request to API logging in dev env
if (config.env === 'development') {
	app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json({
	limit: "50mb"
}));
app.use(bodyParser.urlencoded({
	extended: true,
	limit: "50mb"
}));

app.use(cookieParser());
app.use(methodOverride());
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable detailed API logging in dev env
if (config.env === 'development') {
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
}

app.use(express.static(path.join(appRoot.path, 'dist')));

app.use('/api', routes);

app.get('*', (req, res) => {
	res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new APIError('API not found', httpStatus.NOT_FOUND);
	return next(err);
});


app.use(expressWinston.errorLogger({
	winstonInstance
}));

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
	res.status(err.status).json({
		message: err.isPublic ? err.message : httpStatus[err.status],
		stack: config.env === 'development' ? err.stack : {}
	})
);

export default app;
