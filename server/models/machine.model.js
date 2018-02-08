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
    		required: true
    	},
    	local: {
    		type: String,
    		required: true
    	},
    	active: {
    		type: Boolean,
    		required: true,
    		default: true
    	}
    });

    MachineSchema.statics = {

    	getAll() {
    		return this.find({})
    			.exec()
    			.catch(err => {
    				console.error(err);
    			});
    	},

    	getSome(compNameList) {
    		return this.find({
    				"name": {
    					"$in": compNameList
    				}
    			})
    			.exec()
    			.catch(err => {
    				console.error(err);
    			});
    	}
    }

    export default mongoose.model('Machine', MachineSchema);
