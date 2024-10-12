const express = require("express");
const app = express();
const userRouter = require("./routes/user-router")
const adminRouter = require("./routes/admin-router")
const connectDb = require("./config/db");

connectDb();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", userRouter);
app.use("/admin", adminRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});