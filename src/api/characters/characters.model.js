const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    profession: { type: String, required: true, trim: true },
    sanity: { type: Number, required: true, trim: true },
    image: { type: String, required: false, trim: true },
    provenance: { type: Schema.Types.ObjectId, required: false, ref: "places" },
    adversary: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "creatures",
    },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model("character", characterSchema);
module.exports = Character;
