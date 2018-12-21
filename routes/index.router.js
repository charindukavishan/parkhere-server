const express = require('express');
const router = express.Router();

const ctrlMobile = require('../controllers/mobile.controller');

const jwtHelper = require('../config/jwtHelper');
// Mobile routing >>>>>>>>>>


router.post('/register', ctrlMobile.register);
router.post('/authenticate', ctrlMobile.authenticate);
router.post('/updateUser', ctrlMobile.updateUser);
router.post('/getUser', ctrlMobile.getUser);
router.post('/addUserVehicle', ctrlMobile.addUserVehicle);
router.post('/updateUserVehicle', ctrlMobile.updateUserVehicle);
router.post('/deleteUserVehicle', ctrlMobile.deleteUserVehicle);
router.post('/verify', ctrlMobile.verify);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlMobile.userProfile);
router.get('/getname/:email', ctrlMobile.getname);
router.put('/rstpw',ctrlMobile.puttoken);
router.get('/test',ctrlMobile.test);



// webApp routing  >>>>>>>>>>>>>>>>>>>>>>>


const ctrlUser = require('../controllers/webuser.controller');
const keeper=require('../controllers/parkkeeper.controller')
// const filecntrl=require('../controllers/userfile');
// const admincntrl=require('../controllers/adminfile')
// const jwtHelper = require('../config/jwtHelper');

router.post('/web/register', ctrlUser.register);
router.post('/web/authenticate', ctrlUser.authenticate);
router.get('/web/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/web/userProfile/:id', ctrlUser.getowner);
router.get('/web/getname/:email', ctrlUser.getname);
router.get('/web/rstpw/:email',ctrlUser.puttoken);
router.get('/web/resetpassword/:token', ctrlUser.rstpw);
router.put('/web/savepassword',ctrlUser.savepassword);
router.post('/web/newPost', ctrlUser.newPost);
router.get('/web/getPosts',ctrlUser.getPosts)
router.put('/web/editpro/:id',ctrlUser.editpro);
 
router.post('/web/regkeeper/:id',keeper.pkregister);
router.post('/web/keeper/authenticate', keeper.authenticate);
router.get('/web/keeperProfile',jwtHelper.verifyJwtToken, keeper.keeperProfile);
router.get('/web/getkeepers/:id', keeper.getkeepers);
router.get('/web/setstate/:id/:state',keeper.setstate);
router.get('/web/getnewkeepers',keeper.getnewkeepers);
router.get('/web/acceptpark/:id',keeper.acceptpark)

router.get('/web/users', ctrlUser.users);
router.get('/web/readmsg/:file',ctrlUser.readmsg);
router.get('/web/getowners', ctrlUser.getowners);

// router.post('/upload/:id',filecntrl.savefile);
// router.get('/files/:id',filecntrl.files)
// router.get('/file/:filename',filecntrl.file)
// router.get('/adminfile/:filename',filecntrl.adminfile)
// router.get('/getusername/:id',ctrlUser.getusername)

// router.post('/upload/:id/:sid',admincntrl.savefile);
// router.get('/rfiles/:id',admincntrl.files)
// router.get('/userfiles',admincntrl.userfiles)
// router.get('/admindoc',admincntrl.adminfiles)
// router.get('/messages',admincntrl.messages)

module.exports = router;



