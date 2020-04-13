const express         = require('express');
const router         = express.Router();

const rolesController = require('../controllers/roles.controller');
const categoriesController = require('../controllers/categories.controller');
const keysController = require('../controllers/keys.controller');
const productController = require('../controllers/products.controller');

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

router.get('/categories', categoriesController.get);
router.post('/categories', categoriesController.create);

router.get('/categories/:id', categoriesController.getAll);
router.put('/categories/:id', categoriesController.update);
router.delete('/categories/:id', categoriesController.remove);

// Keys CRUD

router.get('/keys', keysController.get);
router.post('/keys', keysController.create);

router.get('/keys/:id', keysController.getAll);
router.put('/keys/:id', keysController.update);
router.delete('/keys/:id', keysController.remove);

// products CRUD

router.get('/product', productController.get);
router.post('/product', productController.create);

router.get('/product/:id', productController.getAll);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.remove);

module.exports = router;