const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const email=require('nodemailer');
const bcrypt = require('bcryptjs');

const User = mongoose.model('User');
var transporter = email.createTransport({
    service: 'gmail',
    auth: {
      user: 'charindukavishan@gmail.com',
      pass: 'asformyol0757073683'
    }
  });
module.exports.register = (req, res, next) => {
    var user=new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        tel: req.body.tel,
        nic: req.body.nic,
        password : req.body.password,
        freeland :req.body.freeland,
        sheltered: req.body.sheltered,
        car:req.body.car,
        bus:req.body.bus,
        bicycle:req.body.bicycle,
        van:req.body.van,
        lorry:req.body.lorry,
        other :req.body.other,
        mweight :req.body.mweight,
        mheight:req.body.mweight,
        vehicles:req.body.vehicles,
        street:req.body.street,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
        temptoken:req.body.temptoken
        });
        user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json({"status":"error","error":err});
        // registered user
        else if (user) return res.status(200).json({ "status":"success","user":{
            "fname": user.firstName,
            "lname":user.lastName,
            "uid":user._id,
            "email":user.email
        }});
        // unknown user or wrong password
        else return res.status(404).json({"status":"error","error":info});
    })(req, res);
}

module.exports.test = (req,res, next)=>{
    User.findOne({ _id: "5b938499608bc60004046f2d"},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else{console.log('Im in backend');
                return res.status(200).json({ status: true, user});}
        }
    );
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else{console.log('Im in backend');
                return res.status(200).json({ status: true, user});}
        }
    );
}


module.exports.getname=(req,res,next)=>{
    User.findOne({email:req.params.email}).select().exec((err,user)=>{
        console.log(bcrypt.getRounds(user.password))
            if(!user){ console.log('svdjsdj')
                res.json({sucsess:false,message:'email was not found'})
            }
    
            else{ 
                var email={
                    from:'',
                    to:'',
                    subject:user.firstName,
                    text:bcrypt.getRounds(user.password)
                };
                transporter.sendMail(email, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  return res.status(200).json({ status: true, user});
            }
        
        
    })
    
    
    

}

module.exports.puttoken=(req,res)=>{
    User.findOne({email:req.body.email}).select().exec((err,user)=>{console.log(user)
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{
            user.temptoken= user.generateJwt();
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{
                    var email={
                        from:'charindukavishan@gmail.com',
                        to:user.email,
                        subject:user.firstName,
                        text:'http://localhost:4200/newpassword/'+user.temptoken
                    };
                    transporter.sendMail(email, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                          res.json({sucsess:true,message:'message was send to your email'})
                        }
                      });
                }
            })
        }
    })


}