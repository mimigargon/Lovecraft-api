const { deleteFile } = require("../../utils/middlewares/deleteFile.middleware");
const Character = require("./characters.model");
const getAllCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find()
      .populate("creatures")
      .populate("places");
    return res.status(200).json(characters);
  } catch (error) {
    return next(error);
  }
};

const getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id)
      .populate("creatures")
      .populate("places");
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

    if (req.file) {
      newCharacter.image = req.file.path;
    }

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
    if (req.file) {
      putCharacter.image = req.file.path;
    }
    const characterDB = await Character.findByIdAndUpdate(id, putCharacter);
    if (!characterDB) {
      const error = new Error("No character found");
      error.status = 404;
      return next(error);
    }

    if (characterDB.image) {
      deleteFile(characterDB.image);
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

    if (characterDB.image) {
      deleteFile(characterDB.image);
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
