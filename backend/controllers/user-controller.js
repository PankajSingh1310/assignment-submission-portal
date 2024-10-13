const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const assignmentModel = require("../models/assignment-model");

const userRegister = async (req, res) => {
    
    try {
        const {fullname, email, password, } = req.body;
        const userExist = await userModel.findOne({email});

        if(userExist) return res.status(409).json({message: "User Already Exist"});

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const user = await userModel.create({
                    fullname,
                    email,
                    password: hash
                });

                res.status(201).json({message: "user created successfully"});
            });
        });
        
    } catch (error) {
        res.status(500).json({error});
    }
}

const userLogin = async (req, res) => {

    try {
        const {email, password} = req.body;

        const userExist = await userModel.findOne({email});
        if(!userExist) return res.status(401).json("email or password is wrong");

        bcrypt.compare(password, userExist.password, function (err, result){
            
            if(!result) return res.status(401).json("email or password is wrong");

            res.status(200).json({message: "you can login"})
        })
    } catch (error) {
        res.status(500).json({error});
    }
}

const uploadAssignment = async (req, res) => {

    const { task } = req.body;
    

    const createdAssignment = await assignmentModel.create({
        task
    })
}

module.exports = {userRegister, userLogin, uploadAssignment}