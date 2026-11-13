exports.isAuthenticated = (req, res, next) => {
    const user = req.session?.user || req.user;
    if (!user) {
        return res.redirect("/login");
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    const user = req.session?.user || req.user;
    if (!user) {
        return res.redirect("/login");
    }
    if (user.role !== "admin") {
        return res.status(403).send("Ez az oldal csak admin jogosultsággal elérhető!");
    }
    next();
};