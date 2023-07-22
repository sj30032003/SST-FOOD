 const express= require('express');
const router= express.Router();
const User= require('../models/User');
const{body,validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const jwtSecret= "mynameissourabhjainthatisfinal"
const requireSignIn = async (req, res, next) => {

    try {
      const decode = jwt.verify(
        req.headers.authorization,
        jwtSecret
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };
router.post("/createuser",[
body('email').isEmail(),
body('name').isLength({min:5}),
body('password','Incorrect password').isLength({min:5})],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword= await bcrypt.hash(req.body.password,salt)
  try{
   await User.create({
        name:req.body.name,
        password:secPassword,
        email:req.body.email,
        location:req.body.location
    })
    res.json({sucess:true});
  }catch{
    console.log(err);
    res.json({sucess:false});
  }
})

router.get("/user-auth", requireSignIn,  (req, res) => {
    res.status(200).send({ ok: true });
  });
router.post("/loginuser",[
    body('email').isEmail(),
    body('password','Incorrect password').isLength({min:5})],async(req,res)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        let email= req.body.email;

    try{
        let userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"try login with correct credentials"});
        }
        const pwdCompare= await bcrypt.compare(req.body.password,userData.password);
        if(!pwdCompare){
            return res.status(400).json({errors:"try login with correct credentials"});
        }
        const data ={
            user:{
                 id:userData.id
            }
        }
        const authToken= jwt.sign(data,jwtSecret);
        return res.json({success:true,Data:userData,authToken:authToken});
    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})

  const updateProfileController = async (req, res) => {
    try {
        // console.log(req.body);
      const { name, password, location } = req.body;
      const user = await User.findById(req.user.user.id);

      //password
      if (password && password.length < 5) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = password ? await  bcrypt.hash(password,salt) : undefined;
      const updatedUser = await User.findByIdAndUpdate(
        req.user.user.id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          location: location || user.location,
        },
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser:updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
router.put("/profile", requireSignIn, updateProfileController);

module.exports = router;