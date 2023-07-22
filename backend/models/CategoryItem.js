const mongoose = require('mongoose');
const {Schema}= mongoose;
const CategorySchema = new Schema({
  CategoryName: {
    type:String,
  unique: true,
  required:true,
  }
});
module.exports= mongoose.model('categoryItem',CategorySchema)