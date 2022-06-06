const express = require("express");
const { isAuthenticated } = require("../../utils/middlewares/auth.middlewares");
const {
  getAllCreatures,
  getCreature,
  postNewCreature,
  putCreature,
  deleteCreature,
} = require("./creatures.controller");

const upload = require("../../utils/middlewares/uploadFile.middleware");

const CreaturesRoutes = express.Router();

CreaturesRoutes.get("/", getAllCreatures);
CreaturesRoutes.get("/:id", getCreature);
CreaturesRoutes.post("/", upload.single("image"), postNewCreature);
CreaturesRoutes.put("/:id", upload.single("image"), putCreature);
CreaturesRoutes.delete("/:id", deleteCreature);

module.exports = CreaturesRoutes;
