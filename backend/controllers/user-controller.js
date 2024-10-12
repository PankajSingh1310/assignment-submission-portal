const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");

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

module.exports = {userRegister}