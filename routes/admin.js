const express         = require('express');
const router         = express.Router();

const rolesController = require('../controllers/admin/roles.controller');
const categoriesController = require('../controllers/admin/categories.controller');
const keysController = require('../controllers/admin/keys.controller');
const productController = require('../controllers/admin/products.controller');
const UserController    = require('../controllers/admin/user.controller');
const CompanyController = require('../controllers/admin/company.controller');
const StoresController = require('../controllers/admin/stores.controller');

const custom            = require('./../middleware/custom');

const passport          = require('passport');
const path              = require('path');

require('../middleware/passport')(passport);

/* 
 * Admin Route With Authentication
 * Will be validate If Role Is Admin
 */

// Roles CRUD

router.post('/users', passport.authenticate('admin', {session:false}), UserController.create); //create   
                                               
router.get('/users', passport.authenticate('admin', {session:false}), UserController.getAll);  //read

router.get('/users/:id', passport.authenticate('admin', {session:false}), UserController.get);  //read
     
router.put('/users', passport.authenticate('admin', {session:false}), UserController.update); //update
   
router.delete('/users/:id', passport.authenticate('admin',{session:false}), UserController.remove); //delete

router.post( '/companies', passport.authenticate('admin', {session:false}), CompanyController.create);
router.get('/companies', passport.authenticate('admin', {session:false}), CompanyController.getAll);

router.get('/companies/:id', passport.authenticate('admin', {session:false}), custom.company, CompanyController.get);
router.put('/companies', passport.authenticate('admin', {session:false}), custom.company, CompanyController.update);
router.delete('/companies/:id', passport.authenticate('admin', {session:false}), custom.company, CompanyController.remove);

router.get('/roles', passport.authenticate('admin', {session:false}), rolesController.getAll);
router.post('/roles', passport.authenticate('admin', {session:false}), rolesController.create);

router.get('/roles/:id', passport.authenticate('admin', {session:false}), rolesController.get);
router.put('/roles', passport.authenticate('admin', {session:false}), rolesController.update);
router.delete('/roles/:id', passport.authenticate('admin', {session:false}), rolesController.remove);

// Categories CRUD

router.get('/categories', passport.authenticate('admin', {session:false}), categoriesController.getAll);
router.post('/categories', passport.authenticate('admin', {session:false}), categoriesController.create);

router.get('/categories/:id', passport.authenticate('admin', {session:false}), categoriesController.get);
router.put('/categories', passport.authenticate('admin', {session:false}), categoriesController.update);
router.delete('/categories/:id', passport.authenticate('admin', {session:false}), categoriesController.remove);

// Keys CRUD

router.get('/keys', passport.authenticate('admin', {session:false}), keysController.getAll);
router.post('/keys', passport.authenticate('admin', {session:false}), keysController.create);

router.get('/keys/:id', passport.authenticate('admin', {session:false}), keysController.get);
router.put('/keys', passport.authenticate('admin', {session:false}), keysController.update);
router.delete('/keys/:id', passport.authenticate('admin', {session:false}), keysController.remove);

// products CRUD

router.get('/product', passport.authenticate('admin', {session:false}), productController.getAll);
router.post('/product', passport.authenticate('admin', {session:false}), productController.create);

router.get('/product/:id', passport.authenticate('admin', {session:false}), productController.get);
router.put('/product', passport.authenticate('admin', {session:false}), productController.update);
router.delete('/product/:id', passport.authenticate('admin', {session:false}), productController.remove);


// stores CRUD

router.get('/stores', passport.authenticate('admin', {session:false}), StoresController.getAll);
router.post('/stores', passport.authenticate('admin', {session:false}), StoresController.create);

router.get('/stores/:id', passport.authenticate('admin', {session:false}), StoresController.get);
router.put('/stores', passport.authenticate('admin', {session:false}), StoresController.update);
router.delete('/stores/:id', passport.authenticate('admin', {session:false}), StoresController.remove);

module.exports = router;