const Creature = require("./creatures.model");

const getAllCreatures = async (req, res, next) => {
  try {
    const creatures = await Creature.find().populate("places");
    return res.status(200).json(creatures);
  } catch (error) {
    return next(error);
  }
};

const getCreature = async (req, res, next) => {
  try {
    const { id } = req.params;
    const creature = await Creature.findById(id).populate("places");
    if (!creature) {
      const error = new Error("No creature found");
      error.status = 400;
      return next(error);
    }
    return res.status(200).json(creature);
  } catch (error) {
    return next(error);
  }
};

const postNewCreature = async (req, res, next) => {
  try {
    const newCreature = new Creature(req.body);
    const creatureDB = await newCreature.save();
    return res.status(201).json(creatureDB);
  } catch (error) {
    return next(error);
  }
};

const putCreature = async (req, res, next) => {
  try {
    const { id } = req.params;
    const putCreature = new Creature(req.body);
    putCreature._id = id;
    const creatureDB = await Creature.findByIdAndUpdate(id, putCreature);
    if (!creatureDB) {
      const error = new Error("No creature found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(creatureDB);
  } catch (error) {
    return next(error);
  }
};

const deleteCreature = async (req, res, next) => {
  try {
    const { id } = req.params;
    const creatureDB = await Creature.findByIdAndDelete(id);
    if (!creatureDB) {
      const error = new Error("No creature found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(creatureDB);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCreatures,
  getCreature,
  postNewCreature,
  putCreature,
  deleteCreature,
};
