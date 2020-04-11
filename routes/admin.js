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

router.get('/roles', passport.authenticate('jwt', {session:false}), rolesController.get);
router.post('/roles', passport.authenticate('jwt', {session:false}), rolesController.create);

router.get('/roles/:id', passport.authenticate('jwt', {session:false}), rolesController.getAll);
router.put('/roles/:id', passport.authenticate('jwt', {session:false}), rolesController.update);
router.delete('/roles:id', passport.authenticate('jwt', {session:false}), rolesController.remove);

// Categories CRUD

router.get('/categories', passport.authenticate('jwt', {session:false}), categoriesController.get);
router.post('/categories', passport.authenticate('jwt', {session:false}), categoriesController.create);

router.get('/categories/:id', passport.authenticate('jwt', {session:false}), categoriesController.getAll);
router.put('/categories/:id', passport.authenticate('jwt', {session:false}), categoriesController.update);
router.delete('/categories/:id', passport.authenticate('jwt', {session:false}), categoriesController.remove);

// Keys CRUD

router.get('/keys', passport.authenticate('jwt', {session:false}), keysController.get);
router.post('/keys', passport.authenticate('jwt', {session:false}), keysController.create);

router.get('/keys/:id', passport.authenticate('jwt', {session:false}), keysController.getAll);
router.put('/keys/:id', passport.authenticate('jwt', {session:false}), keysController.update);
router.delete('/keys/:id', passport.authenticate('jwt', {session:false}), keysController.remove);

// products CRUD

router.get('/product', passport.authenticate('jwt', {session:false}), productController.get);
router.post('/product', passport.authenticate('jwt', {session:false}), productController.create);

router.get('/product/:id', passport.authenticate('jwt', {session:false}), productController.getAll);
router.put('/product/:id', passport.authenticate('jwt', {session:false}), productController.update);
router.delete('/product/:id', passport.authenticate('jwt', {session:false}), productController.remove);

module.exports = router;