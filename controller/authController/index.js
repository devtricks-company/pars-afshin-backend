const Admin = require('../../models/Admin');
const bcryptJs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config= require('config');

const adminLoginController = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({msg:errors.array()});
    const {email,password} = req.body;
    try {
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(401).json({msg:"email is not exist"});
        }

        const match = await bcryptJs.compare(password,admin.password);
        if(!match){
            return res.status(500).json({msg:"password is worng"});
        }

        const token = jwt.sign({id:admin.id,name:admin.name,email:admin.email,pic:admin.pic,superAdmin:admin.superAdmin,active:admin.active,createAt:admin.createAt},config.get('SECRETKEY'),{
            expiresIn:"1 day"
        });

        res.status(201).json({
            ...admin._doc,
            id:admin.id,
            token:`Bearer ${token}`
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Internal server errors"});
    }
}


module.exports = {
    adminLoginController
}