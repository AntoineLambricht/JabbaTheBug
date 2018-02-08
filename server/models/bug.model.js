import mongoose from "mongoose";
import TESTDB from "../modules/db";


const BugSchema = new mongoose.Schema({

	machinename: {
		type: String,
		required: true
	},
	mailuser: {
		type: String,
		required: true
	},
	descrip: {
		type: String,
		required: true
	},
	datehour: {
		type: Date,
		default: Date.now()
	},
	photo: {
		type: String
	},
	statusinfo: {
		type: Boolean,
		default: false
	}

})

BugSchema.statics = {

	getAll() {
		return this.find({})
			.exec();
		.catch(err => {
			console.error(err);
		})
	}

}


export default mongoose.model('Bug', BugSchema);
