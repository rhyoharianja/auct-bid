const { ipayacards } = require('../../models');
const{ to, ReE, ReS } = require('../../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, data;

    let reqdata = req.body;
    if (Array.isArray(req.files) && req.files.length > 0 ) {
        reqdata.ipayicon = '/uploads/' + req.files[0].filename;
    }
    
    [err, data] = await to(ipayacards.create(reqdata));

    if(err) return ReE(res, err, 422);

    let jsondata = data.toWeb();

    return ReS(res,{message: 'Success Add New Category', data:jsondata}, 201);
}

module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, data;

    [err, data] = await to(ipayacards.findAll());
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Ipay Card List', data:data}, 201);
}

module.exports.getAll = getAll;

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    let err, data;

    [err, data] = await to(ipayacards.findOne({where: {id: req.params.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Detail Ipay Card', data:categories}, 201);
}

module.exports.get = get;

const update = async function (req, res) {
    let err, data, dataresp;
    data = req.body;

    if (Array.isArray(req.files) && req.files.length > 0 ) {
        reqdata.ipayicon = '/uploads/' + req.files[0].filename;
    }

    [err, dataresp] = await to(ipayacards.update(
        data,
        {where: {id: data.id} }
    ));
    if(err) return ReE(res, err, 422);

    [err, dataresp] = await to(ipayacards.findOne({
        where: {
            id: data,id
        }
    }));

    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Update Detail Ipay Card', data:dataresp}, 201);
}

module.exports.update = update;

const remove = async function (req, res) {
    let data, err;

    [err, data] = await to(ipayacards.destroy({
        where: {
          id: req.body.id
        }
    }));
    if(err) return ReE(res, err, 422);

    if(err) return ReE(res, 'error occured trying to delete the Category');

    return ReS(res, {message:'Successfully Delete Category', data:data}, 201);
}

module.exports.remove = remove;