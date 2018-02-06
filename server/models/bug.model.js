


const BugSchema = new mongoose.Schema({

  machinename: {
    type: String,
    required: true
    },
  mailuser:{
    type: String,
    required: true
  },
  descrip:{
    type: String,
    required: true
  },
  datehour:{
    type: Date,
    default: Date.now()
  },
  photo:{
    type: Image,
  },
  statusinfo:{
    type: Boolean,
    default:false
  }

})
