const Admin  = require('../../models/Admin');
const {validationResult} = require('express-validator');
const bcryptJs = require('bcryptjs');

const registerAdminController = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())  return res.status(400).json({msg: errors.array()});
    const {name,email,pic,password,superAdmin} = req.body;
    try {
       const admin = await Admin.findOne({email});
       if(admin){
           return res.status(400).json({msg:"email is already exist"});
       } 

       const newAdmin = new Admin({
           name,
           email,
           pic,
           password,
           superAdmin: superAdmin || false,
           active:true,
           createAt:new Date()
       });

       const salt = await bcryptJs.genSalt(10);
       const hashPassword = await bcryptJs.hash(newAdmin.password,salt);
       newAdmin.password = hashPassword;
       await newAdmin.save();


       res.status(201).json({
           ...newAdmin._doc,
           id:newAdmin.id,
           
       })
    } catch (error) {
        
    } 
}

module.exports = {
    registerAdminController
}