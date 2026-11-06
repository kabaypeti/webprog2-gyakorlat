const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nev: { type: String, unique: true },
    kategorianev: { type: String, ref: 'Kategoria' },
    vegetarianus: { type: Boolean, default: false }
});

module.exports=mongoose.model("Pizza",schema,"pizza");