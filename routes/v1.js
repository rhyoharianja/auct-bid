const express         = require('express');
const router         = express.Router();

const UserController    = require('../controllers/admin/user.controller');
const UserData    = require('../controllers/users/profile.controller');
const userKetTrans    = require('../controllers/transactions/keys.controller');
const UserBid    = require('../controllers/transactions/bidding.controller');

const uploads    = require('../config/upload');
const fileUpload    = require('../controllers/test.uplaod');

const passport          = require('passport');
const path              = require('path');

require('../middleware/passport')(passport);

router.post('/users', UserController.create);   
router.post( '/users/login', UserController.login);
router.get('/users/profile',passport.authenticate('users', {session:false}), UserData.get);
router.put('/users',passport.authenticate('users', {session:false}), UserController.update);
router.delete('/users',passport.authenticate('users',{session:false}), UserController.remove);

router.post('/users/update',passport.authenticate('users', {session:false}), uploads.any(), UserData.update);

router.get('/users/Key',passport.authenticate('users',{session:false}), userKetTrans.userKeyList);
router.get('/user/bid',passport.authenticate('users',{session:false}), UserBid.userBidlist);


router.post('/order/Key',passport.authenticate('users',{session:false}), userKetTrans.orderKey);
router.post('/order/bidding',passport.authenticate('users',{session:false}), UserBid.orderBid);
router.put('/order/bidding/update',passport.authenticate('users',{session:false}), UserBid.updateOrderBid);

router.get('/users/room/list',passport.authenticate('users',{session:false}), UserBid.storeListUser);
router.get('/users/room/live',passport.authenticate('users',{session:false}), UserBid.storeListLiveUser);
router.get('/users/room/waiting',passport.authenticate('users',{session:false}), UserBid.storeListWaitingUser);
router.get('/users/room/end',passport.authenticate('users',{session:false}), UserBid.storeListEndUser);

router.get('/room/list',passport.authenticate('users',{session:false}), UserBid.storeList);
router.get('/room/detail/:id',passport.authenticate('users',{session:false}), UserBid.storeListDetail);
router.get('/room/live',passport.authenticate('users',{session:false}), UserBid.storeListLive);
router.get('/room/waiting',passport.authenticate('users',{session:false}), UserBid.storeListWaiting);
router.get('/room/end',passport.authenticate('users',{session:false}), UserBid.storeListEnd);

router.get('/key/list',passport.authenticate('users',{session:false}), userKetTrans.keyList);

router.post('/upload/test', uploads.any(), fileUpload.get);

module.exports = router;