const express= require('express');
const router= express.Router();
const mongoose = require('mongoose');
router.post('/foodData',async(req,res)=>{

    try{
          const fetch_data = mongoose.connection.db.collection("items").find({});
    const results = await fetch_data.toArray();

    if (results.length > 0) {
        const foodCategory = mongoose.connection.db.collection("categoryitems").find({});
        const result1 = await foodCategory.toArray();
      res.send([results,result1])
    } else {
        console.log('No listings found');
    }
    }catch{
        console.log(err.message);
        res.send('Server Error');
    }
})
module.exports= router;
