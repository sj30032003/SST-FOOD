const express= require('express');
const router= express.Router();
const Item= require('../models/Item');

router.post("/createItem",async(req,res)=>{
     console.log(req.body.options);
      try{
       await Item.create({
        CategoryName:req.body.CategoryName,
            name:req.body.name,
            img:req.body.img,
            options:req.body.options,
            description:req.body.description
        })
        res.json({sucess:true});
      }catch{
        console.log(err);
        res.json({sucess:false});
      }
    })
    module.exports = router;