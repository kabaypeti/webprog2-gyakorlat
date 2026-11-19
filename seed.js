require("dotenv").config();
const reader = require("./seed/reader")
const mongoose = require("mongoose")
const Kategoria = require("./models/Kategoria")
const Pizza = require("./models/Pizza")
const Rendeles = require("./models/Rendeles")

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Seedelés kezdődik");
  
  //await Kategoria.deleteMany({});
  //await Pizza.deleteMany({});
  //await Rendeles.deleteMany({});
  
  if (Kategoria.length == 0) await Kategoria.insertMany(reader.read("kategoria"));
  if (Pizza.length == 0) await Pizza.insertMany(reader.read("pizza"));
  if (Rendeles.length == 0) await Rendeles.insertMany(reader.read("rendeles"));
  
  console.log("Seedelés kész");
  mongoose.connection.close();
}
seed();