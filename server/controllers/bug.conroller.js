import APIError from '../helpers/APIError';
import Bug from '../models/bug.model';

function getAllBugs(req, res, next){
    Bug.getAll()
    .then(bugs => res.json(bugs))
    .catch(e => next(e))
}

function newBug(req, res, next){
    var bug = new Bug(req.body)
    bug.save()
    .then(savedBug => res.json(savedBug))
    .catch(e => next(e));
}

export default { getAllMachines };