    import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';
import TESTDB from '../modules/db'

const MachineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	ip: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	macaddress: {
		type: String,
		required: true
	},
	qrcode: {
		type: String,
		require: false
	}
});

MachineSchema.statics = {

	getAll() {
		return this.find({})
			.exec();


		//return TESTDB.getAllMachines();
	},

	getSome(compNameList) {
		return this.find({
				"name": {
					"$in": compNameList
				}
			})
			.exec();

		//return TESTDB.getSomeMachines(compNameList);
	}

}

export default mongoose.model('Machine', MachineSchema);
