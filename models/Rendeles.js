const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    pizzanev: { type: String },
    darab: { type: Number, default: 0 },
    felvetel: { type: String },
    kiszallitas: { type: String }
});

module.exports=mongoose.model("Rendeles",schema,"rendeles");