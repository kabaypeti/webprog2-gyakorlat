const router = require("express").Router();
const controller = require("../controllers/dbController");

const Pizza = require("../models/Pizza");
const Kategoria = require("../models/Kategoria");
const Rendeles = require("../models/Rendeles");

function dbConfig(req, res, next, model) {
    req.model = model
    next()
}

router.get("/", async (req, res) => { return res.render("dbSelect"); })

router.get("/kategoria", (req,res,next) => dbConfig(req,res,next,Kategoria), controller.pizzaDbView);
router.get("/pizza", (req,res,next) => dbConfig(req,res,next,Pizza), controller.pizzaDbView);
router.get("/rendeles", (req,res,next) => dbConfig(req,res,next,Rendeles), controller.pizzaDbView);

module.exports = router;