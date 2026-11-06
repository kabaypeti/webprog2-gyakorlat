const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    pizzanev: { type: String },
    darab: { type: Number, default: 0 },
    felvetel: { type: Date, default: Date.now() },
    kiszallitas: { type: Date, default: Date.now() }
});

module.exports=mongoose.model("Rendeles",schema,"rendeles");