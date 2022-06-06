const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./src/utils/auth/index');
dotenv.config();

const CharactersRoutes = require("./src/api/characters/characters.routes");
const CreaturesRoutes = require("./src/api/creatures/creatures.routes");
const PlacesRoutes = require("./src/api/places/places.routes");
const UserRoutes = require('./src/api/users/users.routes');

const { connectDb } = require("./src/utils/database/db");

const PORT = process.env.PORT || 8080;

const app = express();
app.disable('x-powered-by');
connectDb();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(
  cors({
    origin: ["https://localhost:3000", "https://localhost:4200"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, 
    }, 
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/characters", CharactersRoutes);

app.use('/creatures', CreaturesRoutes);

app.use('/places', PlacesRoutes);

app.use('/users', UserRoutes);

app.use("/", (req, res) => {
  return res.status(200).json("Mi api de Lovecraft");
});

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found");
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.listen(PORT, () => {
  console.log(`listening in http://localhost:${PORT}`);
});
