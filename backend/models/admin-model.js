const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;