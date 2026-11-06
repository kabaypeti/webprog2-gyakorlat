const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nev: { type: String, unique: true },
    ar: { type: Number, default: 0 },
});

module.exports=mongoose.model("Kategoria",schema,"kategoria");