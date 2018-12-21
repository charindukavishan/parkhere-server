const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer=require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const User = mongoose.model('webUser');
// const User=require('../models/user.model')
const Park = mongoose.model('park');

// module.exports.pkregister = (req, res, next) => {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(req.body.password, salt, (err, hash) => {
            

//             var user=new User({
//                 email:req.body.email,
//                 name:req.body.firstName,
//                 ownerid:req.params.id,
//                 password:hash,
//                 role:req.body.role,
//                 state:"close",
//                 isactivate:"no",
//                 lat:req.body.lat,
//                 lng:req.body.lng,
//                 saltSecret :salt
//                 });
//                 user.save((err, doc) => {
//                 if (!err)
//                 res.json({
//                     status:true,
//                     data:doc,
//                     message:'user registered sucessfully'
//                 })
//                 else {
//                     if (err.code == 11000)
//                         res.status(422).send(['Duplicate email adrress found.']);
//                     else
//                         return next(err);
//                 }
        
//             });
//         });
//     });
// }




module.exports.pkregister =  (req,res,next)=>{

   let newUser =new Park(req.body);
   let slot={
    "isBook":false,
    "slotNumber":0,
    "name":"",
    "nic":"",
    "email":"",
    "parkedAt":"",
    "leavAt":"",
    "isLeav":true
    }
    id="";
   Park.addUser(newUser, (err,user)=>{
       if(err) throw err;
       else{
       for(i=1;i<=req.body.alocatedSlots1;i++){
        slot.slotNumber=i;
     Park.updateOne(
         {
             email:user.email
         },
         { 
             $push:{
                 'type1':slot
             }
         },
         function(err,user){
             
         }
     )
    }
    for(i=1;i<=req.body.alocatedSlots2;i++){
        slot.slotNumber=i;
     Park.updateOne(
         {
             email:user.email
         },
         { 
             $push:{
                 'type2':slot
             }
         },
         function(err,user){
             
         }
     )
    }
    for(i=1;i<=req.body.alocatedSlots3;i++){
        slot.slotNumber=i;
     Park.updateOne(
         {
             email:user.email
         },
         { 
             $push:{
                 'type3':slot
             }
         },
         function(err,user){
             
         }
     )
    }
    for(i=1;i<=req.body.alocatedSlots4;i++){
        slot.slotNumber=i;
     Park.updateOne(
         {
             email:user.email
         },
         { 
             $push:{
                 'type4':slot
             }
         },
         function(err,user){
             
         }
     )
    }
    for(i=1;i<=req.body.alocatedSlots5;i++){
        slot.slotNumber=i;
     Park.updateOne(
         {
             email:user.email
         },
         { 
             $push:{
                 'type5':slot
             }
         },
         function(err,user){
             
         }
     )
    }
    res.json({success: true,msg:'User registered'});

}
   });

};

module.exports.keeperProfile = (req, res, next) =>{console.log('aghkbadhfb');
    Park.findOne({ _id: req._id },
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{console.log('Im in backend');
                return res.status(200).json({ status: true, user});}
        }
    );
}

module.exports.getkeepers = (req, res, next) => {
   User.find({ ownerid :req.params.id },
        (err, user) => {console.log(user)
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{
                res.json(user);}
        }
    );
}


module.exports.setstate=(req,res)=>{
    User.findOne({_id:req.params.id}).select().exec((err,user)=>{console.log(user)
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{ 
            user.state=req.params.state
            
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{
                    res.json({sucsess:true,message:user})
                }
            })
        }
    })
}

module.exports.getnewkeepers=(req,res)=>{
    User.find({isactivate:"no"}).select().exec((err,user)=>{console.log(user)
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{ 
            
            res.json(user)
        }
    })
}

module.exports.acceptpark=(req,res)=>{
    User.findOne({_id:req.params.id}).select().exec((err,user)=>{
        
        if(err) throw err;
       
            user.isactivate="yes";
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{
                    res.json({sucsess:true,message:'Password has been reset'});
                }
            })
            
        
    })

}