const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    felhasznalo: { type: String, required: true },
    uzenet: { type: String, required: true },
    datum: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Uzenet", schema, "uzenet");