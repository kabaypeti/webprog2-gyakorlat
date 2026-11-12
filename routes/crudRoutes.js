const router = require("express").Router();
const controller = require("../controllers/crudController");

const Kategoria = require("../models/Kategoria");;

function dbConfig(req, res, next, model) {
    req.model = model
    next()
}

router.get("/", (req,res,next) => dbConfig(req,res,next,Kategoria), controller.CRUDview);

module.exports = router;