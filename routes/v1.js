const express         = require('express');
const router         = express.Router();

const UserController   = require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController   = require('../controllers/home.controller');

const custom           = require('./../middleware/custom');

const passport         = require('passport');
const path              = require('path');