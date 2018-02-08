import APIError from '../helpers/APIError';
import Bug from '../models/bug.model';
import Machine from '../models/machine.model';

function getAllBugs(req, res, next){
    Bug.getAll()
    .then(bugs => res.json(bugs))
    .catch(e => next(e))
}

function newBug(req, res, next){
    var machinename = req.body.machinename
    Machine.getSome([machinename]).then(machines => {
        console.log("getSome : " + machines)
        if(machines.length === 1){
            var bug = new Bug(req.body)
            bug.save()
            .then(savedBug => res.json(savedBug))
            .catch(e => next(e));
        }else{
            res.status(404);
            res.send("Machine non trouvée, contactez l'administrateur!")
        }

    }).catch(e => next(e))

}
/**
 * compBugList is an array which should be composed of
 * objects with the next format :
 *  {
 *    bug_id : <bugs._id>,
 *    status_info : 'true or false'
 *  }
 * */
function changeStatus(req, res, next){

  var compBugList = req.body.compBugList;
  compBugList.forEach(comp => {
    Bug.update({'_id' : comp.bug_id},{'statusinfo': comp.status_info})
      .exec().then(res.status(200))
      .catch(err => {
        res.status(500);
        err.message;
      });
    // res.status(200);
  })



}

export default { getAllBugs ,newBug, changeStatus};
