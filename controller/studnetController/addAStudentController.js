const Student = require('../../models/Student'); 
const {validationResult} = require('express-validator'); 
const bcryptJS = require('bcryptjs');

 const addAStudentController = async (req,res) => {
    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({msg:errors.array()});

    try {
        const student = await Student.findOne({email});
        if(student) return res.status(400).json({msg:"email already exist"});
        const newStudent = new Student({
            email,
            password
        });

        const salt = await bcryptJS.genSalt(10); 
        const hashPasword = await bcryptJS.hash(password,salt);
        newStudent.password = hashPasword;
        await newStudent.save();
        res.status(200).json({
            ...newStudent._doc,
            id:newStudent.id
        })
    } catch (error) {
        res.status(500).json({msg:"internal server error" + error});
    }
}

module.exports = addAStudentController;