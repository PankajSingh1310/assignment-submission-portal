const adminModel = require("../models/admin-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const assignmentModel = require("../models/assignment-model");

const adminRegister = async (req, res) => {
    
    try {
        const {fullname, email, password, } = req.body;
        const adminExist = await adminModel.findOne({email});

        if(adminExist) return res.status(409).json({message: "User Already Exist"});

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const admin = await adminModel.create({
                    fullname,
                    email,
                    password: hash
                });

                const token = generateToken(admin);
                res.cookie("token", token);

                res.status(201).json({message: "user created successfully", token});
            });
        });
        
    } catch (error) {
        res.status(500).json({error});
    }
}

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const adminExist = await adminModel.findOne({email});
        if(!adminExist) return res.status(401).json("email or password is wrong");

        bcrypt.compare(password, adminExist.password, function (err, result){
            
            if(!result) return res.status(401).json("email or password is wrong");

            const token = generateToken(adminExist);
            res.cookie("token", token);

            res.status(200).json({message: "you can login", token});
        })
    } catch (error) {
        res.status(500).json({error});
    }
}

const getTaggedAssignments = async (req, res) => {
    
    try {
        const { id } = req.user
        const taggedAssignments = await adminModel.findOne({_id: id}).populate("assignments");
        if(!taggedAssignments) return res.status(204).json({message: "no tagged assignments"});

        res.status(200).json({taggedAssignments: taggedAssignments.assignments});
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}

const rejectAssignment = async (req, res) => {
    
    try {
        const {id} = req.params;
        const assignment = await assignmentModel.findOne({_id: id});
        if(!assignment) return res.status(404).json({message: "there is no such assignment"});

        assignment.status = "Rejected";
        await assignment.save();
        
        res.status(200).json({message: "Assignment Rejected"});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    } 
};

const acceptAssignment = async (req, res) => {
    
    try {
        const {id} = req.params;
        const assignment = await assignmentModel.findOne({_id: id});
        if(!assignment) return res.status(404).json({message: "there is no such assignment"});

        assignment.status = "Accepted";
        await assignment.save();
        
        res.status(200).json({message: "Assignment Accepted"});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    } 
};

module.exports = {adminRegister, adminLogin, getTaggedAssignments, rejectAssignment, acceptAssignment}