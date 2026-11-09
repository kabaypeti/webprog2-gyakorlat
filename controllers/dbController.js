const mongoose = require("mongoose");
const Kategoria = require("../models/Kategoria");
const Pizza = require("../models/Pizza");
const Rendeles = require("../models/Rendeles");

const filter = { _id:0,__v:0 }

exports.pizzaDbView = async (req, res) => {
    if (req.model) {
        
        let model = req.model
        let page = parseInt(req.query.page) || 1
        let perpage = parseInt(req.query.perpage) || 10
        
        let columnNames = Object.keys(await model.findOne({},filter).lean().exec());
        
        let data = await paginate(model.find({},filter), page, perpage).lean();
        let count = (await model.aggregate().count("*")).at(0)["*"];
        
        let maxpages = Math.ceil(count / perpage);
        
        res.render("dbView", { columnNames, data, page, perpage, maxpages });
    }
};

const sortoptions = {
    nev: "Pizza neve szerint",
    darab: "Darabszám szerint"
}
const sortmethods = {
    nev: { _id: -1, darab: 1 },
    darab: { darab: 1, _id: -1 }
};

exports.pizzaDbDiagram = async (req, res) => {
    let sorttype = req.query.sorttype || "nev";
    
    console.log(sortmethods[sorttype])
    let data = await Rendeles.aggregate([
        {
            $group: {
                _id: "$pizzanev",
                darab: { $sum: "$darab" } 
            }
        },
        {
            $sort: sortmethods[sorttype]
        },
        { $project: { _id: 1, darab: 1 } }
    ]);
    let data_pizzanev = data.map(x => x["_id"]);
    let data_darab = data.map(x => x["darab"]);
    
    res.render("dbDiagram", { data_pizzanev, data_darab, sortoptions, sorttype });
}

function paginate(query, currentPage, perPage) {
    return query.skip((currentPage-1) * perPage).limit(perPage)
}