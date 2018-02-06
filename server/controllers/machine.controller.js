import APIError from '../helpers/APIError';
import Machine from '../models/machine.model';

function getAllMachines(req, res, next){
    res.json(Machine.getAll())
    //TODO correct way with mongoose

    /*Machine.getAll()
    .then(machines => res.json(machines))
    .catch(e => next(e))*/
}

export default { getAllMachines };