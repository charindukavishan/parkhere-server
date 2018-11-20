const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/updateUser', ctrlUser.updateUser);
router.post('/addUserVehicle', ctrlUser.addUserVehicle);
router.post('/updateUserVehicle', ctrlUser.updateUserVehicle);
router.post('/deleteUserVehicle', ctrlUser.deleteUserVehicle);
router.post('/verify', ctrlUser.verify);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/getname/:email', ctrlUser.getname);
router.put('/rstpw',ctrlUser.puttoken);
router.get('/test',ctrlUser.test);
module.exports = router;



