const express = require("express");
const { isAdmin } = require("../../utils/middlewares/auth.middlewares");
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
CreaturesRoutes.post("/", [isAdmin], postNewCreature);
CreaturesRoutes.put("/:id", putCreature);
CreaturesRoutes.delete("/:id", deleteCreature);

module.exports = CreaturesRoutes;
