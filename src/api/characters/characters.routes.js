const express = require("express");
const { isAuthenticated } = require("../../utils/middlewares/auth.middlewares");
const {
  getAllCharacters,
  getCharacter,
  postNewCharacter,
  putCharacter,
  deleteCharacter,
} = require("./characters.controller");

const upload = require("../../utils/middlewares/uploadFile.middleware");

const CharacterRoutes = express.Router();

CharacterRoutes.get("/", getAllCharacters);
CharacterRoutes.get("/:id", getCharacter);
CharacterRoutes.post("/", upload.single("image"), postNewCharacter);
CharacterRoutes.put("/:id", upload.single("image"), putCharacter);
CharacterRoutes.delete("/:id", deleteCharacter);

module.exports = CharacterRoutes;
