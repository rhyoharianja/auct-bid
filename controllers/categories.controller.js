const { Categories } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, categories;

    let cat_data = req.body;
    
    [err, categories] = await to(Categories.create(cat_data));
    if(err) return ReE(res, err, 422);

    categories.addUser(user, { through: { status: 'started' }});

    [err, categories] = await to(Categories.save());
    if(err) return ReE(res, err, 422);

    let cat_json = categories.toWeb();

    return ReS(res,{categories:cat_json}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, categories;

    [err, categories] = await to(Categories.getAll());

    let cat_json =[]
    for( let i in categories){
        let category = categories[i];
        let cat_data = category.toWeb();
        cat_json.push(cat_data);
    }

    return ReS(res, {categories:cat_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let category = req.category;

    return ReS(res, {category:category.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, category, data;
    category = req.category;
    data = req.body;
    category.set(data);

    [err, company] = await to(category.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {category:category.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let categories, err;
    categories = req.categories;

    [err, categories] = await to(categories.destroy());
    if(err) return ReE(res, 'error occured trying to delete the categories');

    return ReS(res, {message:'Deleted Categories'}, 204);
}
module.exports.remove = remove;