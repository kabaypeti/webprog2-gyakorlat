const mongoose = require("mongoose");
const Kategoria = require("../models/Kategoria");
const Pizza = require("../models/Pizza");
const Rendeles = require("../models/Rendeles");
const bcrypt = require("bcrypt");

const filter = { _id:0,__v:0 }

exports.pizzaDbView = async (req, res) => {
    if (req.model) {
        let model = req.model
        let page = req.query.page || 1
        let columnNames = Object.keys(await model.findOne({},filter).lean().exec());
        let data = await paginate(model.find({},filter), page, 15).lean().exec();
        res.render("dbView", { columnNames, data });
    }
};

function paginate(query, currentPage, perPage) {
    return query.skip((currentPage-1) * perPage).limit(perPage)
}