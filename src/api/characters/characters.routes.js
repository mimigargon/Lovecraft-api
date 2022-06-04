const express = require("express");
const {
  getAllCharacters,
  getCharacter,
  postNewCharacter,
  putCharacter,
  deleteCharacter,
} = require("./characters.controller");

const CharacterRoutes = express.Router();

CharacterRoutes.get("/", getAllCharacters);
CharacterRoutes.get("/:id", getCharacter);
CharacterRoutes.post("/", postNewCharacter);
CharacterRoutes.put("/:id", putCharacter);
CharacterRoutes.delete("/:id", deleteCharacter);

module.exports = CharacterRoutes;
