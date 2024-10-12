const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    task: {
        type: String,
        require: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    status: {
        type: String,
        enum: ["Pending", "Rejected", "Accepted"],
        default: "Pending"
    }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;