import mongoose from 'mongoose';

import config from './server/config/config';
import app from './server/config/express';

import qrcode from './server/models/qrcode';
import pdf from './server/models/pdf';

Promise = require('bluebird');

// make bluebird default Promise
Promise = require('bluebird');

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongoUri || config.mongo.host;
mongoose.connect(mongoUri, {
	socketOptions: {
		keepAlive: 1
	}
});
mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
	mongoose.set('debug', (collectionName, method, query, doc) => {
		debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
	});
}
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912

// listen on port config.port
app.listen(config.port, () => {
	console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
});

qrcode('hello_there');
pdf.generateAll();

export default app;
