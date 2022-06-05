const Character = require("./characters.model");
const getAllCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find().populate("creatures", "places");
    return res.status(200).json(characters);
  } catch (error) {
    return next(error);
  }
};

const getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id).populate("creatures", "places");
    if (!character) {
      const error = new Error("No character found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(character);
  } catch (error) {
    return next(error);
  }
};

const postNewCharacter = async (req, res, next) => {
  try {
    const newCharacter = new Character(req.body);
    const characterDB = await newCharacter.save();
    return res.status(201).json(characterDB);
  } catch (error) {
    return next(error);
  }
};

const putCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const putCharacter = new Character(req.body);
    putCharacter._id = id;
    const CharacterDB = await Character.findByIdAndUpdate(id, putCharacter);
    if (!characterDB) {
      const error = new Error("No character found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(characterDB);
  } catch (error) {
    return next(error);
  }
};

const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterDB = await Character.findByIdAndDelete(id);
    if (!characterDB) {
      const error = new Error("No character found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(characterDB);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCharacters,
  getCharacter,
  postNewCharacter,
  putCharacter,
  deleteCharacter,
};
