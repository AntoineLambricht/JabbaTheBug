import mongoose from 'mongoose';

import config from './server/config/config';
import app from './server/config/express';

//imports for tests
import qrcode from './server/modules/qrcode';
import pdf from './server/modules/pdf';
import ipscan from './server/modules/ipscan';

// make bluebird default Promise
Promise = require('bluebird');

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongoUri || config.mongo.host;
console.log('mongoUri ' + config.mongoUri);
mongoose.connect(mongoUri, {
	keepAlive: 1
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


//test
//pdf.generateAll();
/*
qrcode('localhost:5000/api/report/machine?name=LEN1401', url => {
	pdf.generateSome([{
		name: 'LEN1401',
		url: url
	}]);
});
*/
ipscan.readfile(__dirname + '/server/ressources/ipscan/ipscan017.txt');
ipscan.readfile(__dirname + '/server/ressources/ipscan/ipscan019.txt');


export default app;
