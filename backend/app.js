const express = require("express");
const app = express();
const userRouter = require("./routes/user-router")
const adminRouter = require("./routes/admin-router")

app.use("/user", userRouter);
app.use("register", adminRouter);



const port = 3000;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});