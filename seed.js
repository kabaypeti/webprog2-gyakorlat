require("dotenv").config();
const reader = require("./seed/reader")
const mongoose = require("mongoose")
const Kategoria = require("./models/Kategoria")
const Pizza = require("./models/Pizza")
const Rendeles = require("./models/Rendeles")

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Kapcsolódva");
  
  await Kategoria.deleteMany({});
  await Pizza.deleteMany({});
  await Rendeles.deleteMany({});
  
  await Kategoria.insertMany(reader.read("kategoria"));
  await Pizza.insertMany(reader.read("pizza"));
  await Rendeles.insertMany(reader.read("rendeles"));
  
  console.log("Seedelés kész");
  mongoose.connection.close();
}
seed();