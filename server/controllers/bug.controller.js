import APIError from '../helpers/APIError';
import Bug from '../models/bug.model';
import Machine from '../models/machine.model';

function getAllBugs(req, res, next){
    Bug.getAll()
    .then(bugs => res.json(bugs))
    .catch(e => next(e))
}

function newBug(req, res, next){
    //TODO check if machine 
    var machinename = req.body.machinename
    Machine.getSome(machinename).then(machines => {
        if(machines.length === 1){
            var bug = new Bug(req.body)
            bug.save()
            .then(savedBug => res.json(savedBug))
            .catch(e => next(e));
        }else{
            res.status(404);
        }

    })
    
}

export default { getAllBugs ,newBug};