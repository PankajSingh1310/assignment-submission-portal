const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    assignments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes"
    }
});

const User = mongoose.model("User", userSchema);

module.exports =  User;