const adminModel = require("../models/admin-model");
const bcrypt = require("bcrypt");

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

                res.status(201).json({message: "user created successfully"});
            });
        });
        
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = {adminRegister}