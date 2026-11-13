const Uzenet = require("../models/Uzenet");

exports.showForm = (req, res) => {
    res.render("uzenetkuldes", { errors: {}, uzenet: "", siker: null });
};

exports.sendMessage = async (req, res) => {
    const { uzenet } = req.body;
    let errors = {};

    if (!uzenet || uzenet.trim() === "") {
        errors.uzenet = "Az üzenet mező kitöltése kötelező.";
        return res.render("uzenetkuldes", { errors, uzenet, siker: null });
    }

    const felhasznalo = req.session?.user?.username || req.user?.username || "Vendég"

    try {
        await Uzenet.create({
            felhasznalo: felhasznalo,
            uzenet: uzenet.trim()
        });

        return res.render("uzenetkuldes", { 
            errors: {}, 
            uzenet: "", 
            siker: "Üzenet sikeresen elküldve!" 
        });
    } catch (err) {
        errors.uzenet = "Hiba történt az üzenet mentésekor.";
        return res.render("uzenetkuldes", { errors, uzenet, siker: null });
    }
};

exports.listMessages = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let perpage = parseInt(req.query.perpage) || 10;

        let uzenetek = await paginate(Uzenet.find().sort({ datum: -1 }), page, perpage).lean();
        let count = await Uzenet.countDocuments();

        let maxpages = Math.ceil(count / perpage);

        res.render("uzenetek", { uzenetek, page, perpage, maxpages });
    } catch (err) {
        res.status(500).send("Hiba történt az üzenetek betöltésekor.");
    }
};

function paginate(query, currentPage, perPage) {
    return query.skip((currentPage - 1) * perPage).limit(perPage);
}