const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const CharactersRoutes = require("./src/api/characters/characters.routes");
const CreaturesRoutes = require("./src/api/creatures/creatures.routes");
//const PlacesRoutes = require("./src/api/places/places.routes");

const { connectDb } = require("./src/utils/database/db");

const PORT = process.env.PORT || 8080;

const app = express();
connectDb();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
});

app.use(
  cors({
    origin: ["https://localhost:3000", "https://localhost:4200"],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/characters", CharactersRoutes);

app.use('/creatures', CreaturesRoutes);

//app.use('/places', PlacesRoutes);

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
