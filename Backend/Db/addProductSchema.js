
const mongoose = require("mongoose")

const addProdSchema = new mongoose.Schema ({
     name : String,
     price : Number,
     category : String,
     userId : String,
     company : String,
})

const addProduct = mongoose.model('addProduct', addProdSchema);
module.exports = addProduct;