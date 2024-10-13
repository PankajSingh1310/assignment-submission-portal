const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const assignmentModel = require("../models/assignment-model");
const adminModel = require("../models/admin-model");
const generateToken = require("../utils/generateToken");

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

                const token = generateToken(user);
                res.cookie("token", token);

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

            const token = generateToken(userExist);
            res.cookie("token", token);

            res.status(200).json({message: "you can login"})
        })
    } catch (error) {
        res.status(500).json({error});
    }
}

const uploadAssignment = async (req, res) => {

    try {
        const { task, adminName } = req.body;
        const { id } = req.user;
    
        const taggedAdmin = await adminModel.findOne({fullname: adminName});
        if(!taggedAdmin) return res.status(401).json({message: "no such admin is found"});
    
        const createdAssignment = await assignmentModel.create({
            task,
            adminId: taggedAdmin._id,
            userId: id
        })

        res.status(201).json({message: "assignment submitted successfully", createdAssignment});
    } catch (error) {
        return res.status(500).json({error});
    } 
};

const getAllAdmins = async (req, res) => {

    try {
        const admins = await adminModel.find().select("-password");
        if(!admins) return res.status(401).json({message: "no admin to show"});

        res.status(200).json({admins});
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = {userRegister, userLogin, uploadAssignment, getAllAdmins}