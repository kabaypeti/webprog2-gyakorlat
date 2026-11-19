require("dotenv").config();
const reader = require("./seed/reader")
const mongoose = require("mongoose")
const Kategoria = require("./models/Kategoria")
const Pizza = require("./models/Pizza")
const Rendeles = require("./models/Rendeles")

async function seed() {
  console.log("Seedelés kezdődik");
  
  //await Kategoria.deleteMany({});
  //await Pizza.deleteMany({});
  //await Rendeles.deleteMany({});
  
  if (await Kategoria.countDocuments() === 0) await Kategoria.insertMany(await reader.read("kategoria"));
  if (await Pizza.countDocuments() === 0) await Pizza.insertMany(await reader.read("pizza"));
  if (await Rendeles.countDocuments() === 0) await Rendeles.insertMany(await reader.read("rendeles"));
  
  console.log("Seedelés kész");
}
module.exports = { seed: seed }