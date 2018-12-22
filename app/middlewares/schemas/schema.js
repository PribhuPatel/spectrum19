const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String},
    phone: {type: Number, index: true, required:true, unique: true},
    password: { type: String, match: /[a-z]/ ,required: true},
    role: {type: String, required: true},
    created_date: { type: Date, default: Date.now },
    last_login: {type: Date},
    today_payment: {type: Number, required: true, default: 0 },
    status: {type:Boolean, required:true},
    payment_history : [{
      date: {type: Date },
      payment: {type: Number}
    }],
    registered: {
      participants: [{type:Schema.Types.ObjectId, ref: 'Participants'}],
      entries: [{type: Schema.Types.ObjectId, ref: 'Entries'}]
    }
  });

  var AdminsSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String},
    phone: {type: Number, index: true, required:true, unique: true},
    password: { type: String, match: /[a-z]/ ,required: true},
    role: {type: String, required: true},
    created_date: { type: Date, default: Date.now },
    last_login: {type: Date},
    status: {type:Boolean, required:true},
    department:{type: Schema.Types.ObjectId, ref: 'Departments'}
  });

  var ParticipantSchema = new Schema({
    firstname: { type: String, required:true },
    lastname: { type: String, required: true },
    email: { type: String, required: true},
    phone: {type: Number, index: true, required:true, unique: true},
    college: {type:Schema.Types.ObjectId, required:true, ref: 'Colleges'},
    cvm:{type: Boolean, required: true},
    payment: {type: Number, required: true, default: 30},
    createby: { type: Schema.Types.ObjectId,ref: 'Users',required: true},
    created_date: { type: Date, default: Date.now },
    events: [{type: Schema.Types.ObjectId, ref: 'Events'}],
    password: {type:String}
  });

  var CollegeSchema = new Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    cvm: {type: Boolean, required: true},
    registered: {
      participants: [{type:Schema.Types.ObjectId, ref: 'Participants'}],
      entries: [{type: Schema.Types.ObjectId, ref: 'Entries'}]
    }
  });

  var EventsSchema = new Schema({
    name: {type: String, required:true},
    department: {type: Schema.Types.ObjectId, ref: 'Departments'},
    max_participants:{type: Number, required: true},
    min_members: {type: Number, required:true},
    max_members: {type: Number, required: true},
    price: {type: Number, required: true},
    available_entries: {type: Number, required: true},
    description: {type: String},
    img: {type: String},
    rounds:
     {
      round1: {type:String},
      round2: {type:String},
      round3: {type:String}, 
    },
    coordinators:[{
      name: {type:String},
      phone: {type:Number},
      email: {type:String}
    }]
  });

  var DepartmentSchema = new Schema({
    name:{type: String, required:true, unique:true},
    linked_department:{type: String, required:true, unique: true},
    events: [{type: Schema.Types.ObjectId, ref: 'Events'}],
    coordinator: [{type: Schema.Types.ObjectId, ref: 'Admins'}]
  });
  
  var EntrySchema = new Schema({
    team_leader:{type: Schema.Types.ObjectId, ref:'Participats',required:true},
    event:{type:Schema.Types.ObjectId, ref: 'Events', required: true},
    participants: [{type: Schema.Types.ObjectId , ref:'Participants', required: true}],
    created_by: {type: Schema.Types.ObjectId, ref: 'Users',required:true},
    payment: {type: Number, required:true}
  });

  var GlobalVarSchema= new Schema({
    key: {type: String, required: true,unique:true},
    value:{type: String, required: true}
  });

  var TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
    token:{type: String, required: true},
    created_time: {type: Date, default: Date.now}
  });

var Participants =  mongoose.model('Participants', ParticipantSchema);
var Users =  mongoose.model('Users', UserSchema);
var Events = mongoose.model('Events', EventsSchema);
var Departments = mongoose.model('Departments', DepartmentSchema);
var Entries = mongoose.model('Entries', EntrySchema);
var Colleges = mongoose.model('Colleges',CollegeSchema);
var GlobalVars = mongoose.model('GlobalVars', GlobalVarSchema);
var Tokens = mongoose.model('Tokens', TokenSchema);
var Admins = mongoose.model('Admins', AdminsSchema);

module.exports = {
    Users,Participants, Events, Departments, Entries, GlobalVars, Tokens, Colleges, Admins
}