const express = require("express");
const { isAuthenticated } = require("../../utils/middlewares/auth.middlewares");
const {
  getAllPlaces,
  getPlace,
  postNewPlace,
  putPlace,
  deletePlace,
} = require("./places.controller");

const upload = require("../../utils/middlewares/uploadFile.middleware");

const PlacesRoutes = express.Router();

PlacesRoutes.get("/", getAllPlaces);
PlacesRoutes.get("/:id", getPlace);
PlacesRoutes.post("/", upload.single("image"), postNewPlace);
PlacesRoutes.put("/:id", upload.single("image"), putPlace);
PlacesRoutes.delete("/:id", deletePlace);

module.exports = PlacesRoutes;
