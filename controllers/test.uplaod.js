const upload       = require('../services/uploads.service');
const { to, ReE, ReS }  = require('../services/util.service');

const get = async function(req, res){
    // uploads.any(req.files);
    res.setHeader('Content-Type', 'application/json');
    const files = req.files;
    const body = req.body;
    [err, getFiles] = await to(upload.uploadFiles(files, field));
    if(err) return ReE(res, err, 422);
    return ReS(res,{message: 'Success Add New Images', data:body, file: getFiles}, 201);
}
module.exports.get = get;