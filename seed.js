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
  
  let doc = mongoose.Document.prototype;
  console.log(doc.$isEmpty('kategoria'));
  if (doc.$isEmpty('kategoria')) await Kategoria.updateMany( reader.read("kategoria"));
  if (doc.$isEmpty('pizza')) await Pizza.insertMany(reader.read("pizza"));
  if (doc.$isEmpty('rendeles')) await Rendeles.insertMany(reader.read("rendeles"));
  
  console.log("Seedelés kész");
  mongoose.connection.close();
}
seed();