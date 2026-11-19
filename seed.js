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
  
  if (!(await Kategoria.findOne({}).exec())) await Kategoria.insertMany(reader.read("kategoria"));
  if (!(await Pizza.findOne({}).exec())) await Pizza.insertMany(reader.read("pizza"));
  if (!(await Rendeles.findOne({}).exec())) await Rendeles.insertMany(reader.read("rendeles"));
  
  console.log("Seedelés kész");
  await mongoose.connection.close();
}
seed();