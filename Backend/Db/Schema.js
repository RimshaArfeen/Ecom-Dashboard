
const mongoose = require ("mongoose")

const EcomSchema = new mongoose.Schema ({
     name : {
          type : String,
          require :true
     },
     email : {
          type : String,
          require :true
     },
     password : {
          type : String,
          require :true
     },
})

const Ecommerce = mongoose.model('Ecommerce', EcomSchema);
module.exports = Ecommerce;