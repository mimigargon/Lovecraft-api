const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const placeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    haunted: { type: Number, required: false, trim: true },
    image: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);
const Place = mongoose.model("place", placeSchema);
module.exports = Place;
