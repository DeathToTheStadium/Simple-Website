// Require Mongoose-js 
const mongoose = require('mongoose');

const indexDataSchema = new mongoose.Schema({
    h1:{type:String,required:true},
    h2:String,
    p:{type:String , maxlength:350}
    
})

module.exports = mongoose.model('indexData',indexDataSchema)