const multer = require('muller');

var storage = multer.distStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/resources/static/assets/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

var upload = multer({storage: storage});

module.exports = upload;