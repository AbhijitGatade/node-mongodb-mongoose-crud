const { Binary } = require("mongodb");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    imagepath:{type:String}
});

let User = mongoose.model("users", schema);
module.exports = User;