const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatureSchema = new Schema({
    name: {type: String, required: true, trim: true},
    alias: {type: String, required: false, trim: true},
    provenance: {type: Schema.Types.ObjectId, required: true, ref: 'places'}, 
    image: {type: String, required: false, trim: true}
},
{
    timestamps: true
})

const Creature = mongoose.model('creature', creatureSchema);
module.exports = Creature; 