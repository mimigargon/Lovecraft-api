const express = require("express");
const {
  getAllCreatures,
  getCreature,
  postNewCreature,
  putCreature,
  deleteCreature,
} = require("./creatures.controller");

const CreaturesRoutes = express.Router();

CreaturesRoutes.get("/", getAllCreatures);
CreaturesRoutes.get("/:id", getCreature);
CreaturesRoutes.post("/", postNewCreature);
CreaturesRoutes.put("/:id", putCreature);
CreaturesRoutes.delete("/:id", deleteCreature);

module.exports = CreaturesRoutes;
