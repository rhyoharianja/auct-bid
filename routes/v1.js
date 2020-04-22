const express         = require('express');
const router         = express.Router();

const UserController    = require('../controllers/admin/user.controller');

const custom            = require('./../middleware/custom');

const passport          = require('passport');
const path              = require('path');

require('../middleware/passport')(passport);

router.post('/users', UserController.create); //create   
                                               
router.get('/users', UserController.get);  //read
     
router.put('/users',passport.authenticate('users', {session:false}), UserController.update); //update
   
router.delete('/users',passport.authenticate('users',{session:false}), UserController.remove); //delete
router.post( '/users/login', UserController.login);

module.exports = router;