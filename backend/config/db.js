const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connection successful");
    } catch (error) {
        console.error("connection error:", error);
    }
};

module.exports = connectDb;