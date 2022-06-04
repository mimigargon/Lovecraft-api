const express = require("express");
const {
  getAllPlaces,
  getPlace,
  postNewPlace,
  putPlace,
  deletePlace,
} = require("./places.controller");

const PlacesRoutes = express.Router();

PlacesRoutes.get("/", getAllPlaces);
PlacesRoutes.get("/:id", getPlace);
PlacesRoutes.post("/", postNewPlace);
PlacesRoutes.put("/:id", putPlace);
PlacesRoutes.delete("/:id", deletePlace);

module.exports = PlacesRoutes;
