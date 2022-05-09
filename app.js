const axios = require("axios");
const qs = require("query-string");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const session = require("cookie-session");
var request = require("superagent");
const querystring = require("querystring");
const { promisify } = require("util");

const globalErrorHandler = require("./controllers/errController");
const catchAsync = require("./utils/catchAsync");

// Import routes

const searchRoutes = require("./route/searchRoutes");

const { application } = require("express");

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:4000", "http://localhost:4000"],
    methods: ["GET"],
    credentials: true,
  })
);

app.use(cookieParser());

// Setup express response and body parser configurations
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    proxy: true,
    resave: true,
    saveUnintialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(mongosanitize());

app.use(xss());

app.use("/v1/search", searchRoutes);

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

app.use(globalErrorHandler);

module.exports = app;
