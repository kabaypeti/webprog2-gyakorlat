const Kategoria = require("../models/Kategoria");

const filter = { __v:0 }

exports.CRUDview = async (req, res) => {
    if (req.model) {
        
        let model = req.model
        let page = parseInt(req.query.page) || 1
        let perpage = parseInt(req.query.perpage) || 10
        
        let firstDoc = await model.findOne({}, { _id: 0, __v: 0 }).lean().exec();
        let columnNames = firstDoc ? Object.keys(firstDoc) : ["nev", "ar"];
        
        let data = await paginate(model.find({},filter), page, perpage).lean();
        let count = (await model.aggregate().count("*")).at(0)["*"];
        
        let maxpages = Math.ceil(count / perpage);
        
        res.render("CRUDview", { columnNames, data, page, perpage, maxpages });
    }
};

exports.CRUDcreate = (req, res) => {
    res.render("CRUDcreate", { errors: {}, old: {} });
};

exports.CRUDstore = async (req, res) => {
    if (req.model) {
        let model = req.model;
        let { nev, ar } = req.body;
        let errors = {};

        if (!nev || nev.trim() === "") {
            errors.nev = "A kategória nevének kitöltése kötelező.";
        } else {
            let existing = await model.findOne({ nev: nev.trim() });
            if (existing) {
                errors.nev = "Ez a kategória név már létezik az adatbázisban.";
            }
        }

        if (!ar || isNaN(Number(ar))) {
            errors.ar = "Az ár mezőbe csak számot írhatsz.";
        }

        if (Object.keys(errors).length > 0) {
            return res.render("CRUDcreate", { errors, nev, ar });
        }

        try {
            await model.create({
                nev: nev.trim(),
                ar: Number(ar)
            });
            return res.redirect("/CRUD/");
        } catch (err) {
            errors.nev = "Adatbázis hiba történt a mentéskor.";
            return res.render("CRUDcreate", { errors, nev, ar });
        }
    }
};

exports.CRUDedit = async (req, res) => {
    if (req.model) {
        try {
            const kategoria = await req.model.findById(req.params.id).lean();
            if (!kategoria) {
                return res.status(404).send("A kategória nem található.");
            }
            return res.render("CRUDedit", {
                id: kategoria._id,
                nev: kategoria.nev,
                ar: kategoria.ar,
                errors: {}
            });
        } catch (err) {
            return res.status(400).send("Érvénytelen azonosító.");
        }
    }
};

exports.CRUDupdate = async (req, res) => {
    if (req.model) {
        let model = req.model;
        let id = req.params.id;
        let { nev, ar } = req.body;
        let errors = {};

        if (!nev || nev.trim() === "") {
            errors.nev = "A kategória nevének kitöltése kötelező.";
        } else {
            let existing = await model.findOne({ 
                nev: nev.trim(), 
                _id: { $ne: id }
            });
            if (existing) {
                errors.nev = "Ez a kategória név már létezik az adatbázisban.";
            }
        }

        if (!ar || isNaN(Number(ar))) {
            errors.ar = "Az ár mezőbe csak számot írhatsz.";
        }

        if (Object.keys(errors).length > 0) {
            return res.render("CRUDedit", { errors, id, nev, ar });
        }

        try {
            await model.findByIdAndUpdate(id, {
                nev: nev.trim(),
                ar: Number(ar)
            });
            return res.redirect("/CRUD/");
        } catch (err) {
            errors.nev = "Adatbázis hiba történt a módosításkor.";
            return res.render("CRUDedit", { errors, id, nev, ar });
        }
    }
};

function paginate(query, currentPage, perPage) {
    return query.skip((currentPage-1) * perPage).limit(perPage)
}