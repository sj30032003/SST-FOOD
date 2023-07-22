const mongoose = require('mongoose');
const {Schema}= mongoose;
const ItemSchema = new Schema({
  CategoryName: String,
  name: {
   type: String,
   unique:true,
   require:true
  },
  img: String,
  options: [],
  description: String,
});
module.exports= mongoose.model('item',ItemSchema)