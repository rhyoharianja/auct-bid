const express         = require('express');
const router         = express.Router();

const rolesController = require('../controllers/admin/roles.controller');
const categoriesController = require('../controllers/admin/categories.controller');
const keysController = require('../controllers/admin/keys.controller');
const productController = require('../controllers/admin/products.controller');
const UserController    = require('../controllers/admin/user.controller');
const CompanyController = require('../controllers/admin/company.controller');

const custom            = require('./../middleware/custom');

const passport          = require('passport');
const path              = require('path');

require('../middleware/passport')(passport);

/* 
 * Admin Route With Authentication
 * Will be validate If Role Is Admin
 */

// Roles CRUD

router.post('/users', passport.authenticate('users', {session:false}), UserController.create); //create   
                                               
router.get('/users', passport.authenticate('users', {session:false}), UserController.get);  //read
     
router.put('/users', passport.authenticate('users', {session:false}), UserController.update); //update
   
router.delete('/users', passport.authenticate('users',{session:false}), UserController.remove); //delete
router.post( '/users/login', UserController.login);

router.post( '/companies', passport.authenticate('admin', {session:false}), CompanyController.create);
router.get('/companies', passport.authenticate('admin', {session:false}), CompanyController.getAll);

router.get('/companies/:company_id', passport.authenticate('admin', {session:false}), custom.company, CompanyController.get);
router.put('/companies/:company_id', passport.authenticate('admin', {session:false}), custom.company, CompanyController.update);
router.delete('/companies/:company_id', passport.authenticate('admin', {session:false}), custom.company, CompanyController.remove);
router.get('/roles', passport.authenticate('admin', {session:false}), custom.company, rolesController.getAll);
router.post('/roles', passport.authenticate('admin', {session:false}), custom.company, rolesController.create);

router.get('/roles/:id', passport.authenticate('admin', {session:false}), custom.company, rolesController.get);
router.put('/roles/:id', passport.authenticate('admin', {session:false}), custom.company, rolesController.update);
router.delete('/roles/:id', passport.authenticate('admin', {session:false}), custom.company, rolesController.remove);

// Categories CRUD

router.get('/categories', passport.authenticate('admin', {session:false}), custom.company, categoriesController.getAll);
router.post('/categories', passport.authenticate('admin', {session:false}), custom.company, categoriesController.create);

router.get('/categories/:id', passport.authenticate('admin', {session:false}), custom.company, categoriesController.get);
router.put('/categories/:id', passport.authenticate('admin', {session:false}), custom.company, categoriesController.update);
router.delete('/categories/:id', passport.authenticate('admin', {session:false}), custom.company, categoriesController.remove);

// Keys CRUD

router.get('/keys', passport.authenticate('admin', {session:false}), custom.company, keysController.getAll);
router.post('/keys', passport.authenticate('admin', {session:false}), custom.company, keysController.create);

router.get('/keys/:id', passport.authenticate('admin', {session:false}), custom.company, keysController.get);
router.put('/keys/:id', passport.authenticate('admin', {session:false}), custom.company, keysController.update);
router.delete('/keys/:id', passport.authenticate('admin', {session:false}), custom.company, keysController.remove);

// products CRUD

router.get('/product', passport.authenticate('admin', {session:false}), custom.company, productController.getAll);
router.post('/product', productController.create);

router.get('/product/:id', passport.authenticate('admin', {session:false}), custom.company, productController.get);
router.put('/product/:id', passport.authenticate('admin', {session:false}), custom.company, productController.update);
router.delete('/product/:id', passport.authenticate('admin', {session:false}), custom.company, productController.remove);

module.exports = router;