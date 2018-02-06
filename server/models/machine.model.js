import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';
import TESTDB from '../modules/db'

const MachineSchema = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    ip:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
    //TODO ajouter des trucs
});

MachineSchema.statics = {

    getAll(){

        //TODO real connection
        //return this.find().exec();
        return TESTDB.getAllMachines()
    }

}

export default mongoose.model('Machine', MachineSchema);