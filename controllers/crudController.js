const Kategoria = require("../models/Kategoria");

const filter = { _id:0,__v:0 }

exports.CRUDview = async (req, res) => {
    if (req.model) {
        
        let model = req.model
        let page = parseInt(req.query.page) || 1
        let perpage = parseInt(req.query.perpage) || 10
        
        let columnNames = Object.keys(await model.findOne({},filter).lean().exec());
        
        let data = await paginate(model.find({},filter), page, perpage).lean();
        let count = (await model.aggregate().count("*")).at(0)["*"];
        
        let maxpages = Math.ceil(count / perpage);
        
        res.render("CRUDview", { columnNames, data, page, perpage, maxpages });
    }
};

function paginate(query, currentPage, perPage) {
    return query.skip((currentPage-1) * perPage).limit(perPage)
}