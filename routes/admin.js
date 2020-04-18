const express         = require('express');
const router         = express.Router();

const rolesController = require('../controllers/admin/roles.controller');
const categoriesController = require('../controllers/admin/categories.controller');
const keysController = require('../controllers/admin/keys.controller');
const productController = require('../controllers/admin/products.controller');

const passport          = require('passport');
const path              = require('path');


/* 
 * Admin Route With Authentication
 * Will be validate If Role Is Admin
 */

// Roles CRUD

router.get('/roles', rolesController.getAll);
router.post('/roles', rolesController.create);

router.get('/roles/:id', rolesController.get);
router.put('/roles/:id', rolesController.update);
router.delete('/roles/:id', rolesController.remove);

// Categories CRUD

router.get('/categories', categoriesController.getAll);
router.post('/categories', categoriesController.create);

router.get('/categories/:id', categoriesController.get);
router.put('/categories/:id', categoriesController.update);
router.delete('/categories/:id', categoriesController.remove);

// Keys CRUD

router.get('/keys', keysController.getAll);
router.post('/keys', keysController.create);

router.get('/keys/:id', keysController.get);
router.put('/keys/:id', keysController.update);
router.delete('/keys/:id', keysController.remove);

// products CRUD

router.get('/product', productController.getAll);
router.post('/product', productController.create);

router.get('/product/:id', productController.get);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.remove);

module.exports = router;