const router = require("express").Router();
const controller = require("../controllers/crudController");

const Kategoria = require("../models/Kategoria");;

function dbConfig(req, res, next, model) {
    req.model = model
    next()
}

router.get("/", (req,res,next) => dbConfig(req,res,next,Kategoria), controller.CRUDview);
router.get("/create", (req,res,next) => dbConfig(req,res,next,Kategoria), controller.CRUDcreate);
router.post("/", (req, res, next) => dbConfig(req, res, next, Kategoria), controller.CRUDstore);

router.get("/:id/edit", (req, res, next) => dbConfig(req, res, next, Kategoria), controller.CRUDedit);
router.post("/:id/update", (req, res, next) => dbConfig(req, res, next, Kategoria), controller.CRUDupdate);

module.exports = router;