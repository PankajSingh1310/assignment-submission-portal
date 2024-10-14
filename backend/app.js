require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-router")
const adminRouter = require("./routes/admin-router")
const connectDb = require("./config/db");

connectDb();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", userRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});