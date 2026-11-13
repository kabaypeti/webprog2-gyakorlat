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
