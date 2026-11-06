const mongoose = require("mongoose");
const Kategoria = require("../models/Kategoria");
const Pizza = require("../models/Pizza");
const Rendeles = require("../models/Rendeles");
const bcrypt = require("bcrypt");

exports.pizzaDbView = async (req, res) => { 
    let page = req.query.page || 1
    let data = await paginate(Pizza.find(), page, 15)
    console.log(data)
    res.render("dbView", { data: data });
};

function paginate(query, currentPage, perPage) {
    return query.skip(currentPage * perPage).limit(perPage)
}