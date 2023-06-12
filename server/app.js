const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const billsRouter = require("./routes/bills");
const payeesRouter = require("./routes/payees");
const categoriesRouter = require("./routes/categories");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bills", billsRouter);
app.use("/payees", payeesRouter);
app.use("/categories", categoriesRouter);

// app.listen(8080, () => console.log(`server is running on PORT {port}`));

module.exports = app;
