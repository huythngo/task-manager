const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const errorHandler = require("errorhandler");
require("./db/mongoose");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(errorHandler());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`server is up on ${port}`);
});
