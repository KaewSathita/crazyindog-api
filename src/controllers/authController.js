const fs = require("fs");
// const cloudinary = require("../utils/cloudinary");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require("../utils/appError");
const { Users } = require('../models');




const genToken = payload => jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', { expiresIn: process.env.JWT_EXPIRES || '30d'})


exports.register = async ( req, res, next ) => {
  
  try {
    const { firstName, lastName, penName, petBreed, email, password, confirmPassword, profilepicture } =
      req.body;

      if (!email) {
        throw new AppError('email is required', 400);
      }

      if (!password) {
        throw new AppError('password is required', 400);
      }

      if (password !== confirmPassword) {
        throw new AppError('password and confirm password did not match', 400);
      }

      if (typeof penName !== 'string') {
        throw new AppError ('penname is invalid format', 400); 
      }

      const isEmail = validator.isEmail(email+ '');
      
      if (!isEmail) {
        throw new AppError('email address is invalid format', 400);
      }

      // if (req.files.profilepicture) {
      //   const profilepicture = req.user.profilepicture;
  
      //   const secureUrl = await cloudinary.upload(
      //     req.files.profilepicture[0].path,
      //     profilepicture ? cloudinary.getPublicId(profilepicture) : undefined
      //   );
  
      //   updateValue.profilepicture = secureUrl;
      //   fs.unlinkSync(req.files.profilepicture[0].path);
      // }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await Users.create({
        firstName,
        lastName,
        penName,
        petBreed,
        email: isEmail ? email : null,
        password: hashedPassword,
      });

      const token = genToken({ id: user.id });
      res.status(201).json({token});
  }   catch (err) {
      console.log(err)
      next (err);
  }
};




exports.login = async ( req ,res, next ) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new AppError ('email or passsword is invalid', 400); 
    }
    
    const user = await Users.findOne ({
        where: {
          email: email
        }
      });
    
    if (!user) {
      throw new AppError('email or password is invalid', 400);
    };

    const isCorrect = await bcrypt.compare(password, user.password)
    if(!isCorrect) {
      throw new AppError ('email or password is invalid', 400)
    };
      
    const token = genToken({ id: user.id });
      res.status(200).json({token});
      
    
    } catch (err) {
      next(err);
    }
};

    exports.getMe = ( req, res) => {
      res.status(200).json({user: req.user})
    }


exports.updateMe = async (req, res, next) => {

  try {
    const { firstName, lastName, penName, petBreed, email } = req.body;
    
      if (!email) {
        throw new AppError('email is required', 400);
      }
      
      if (typeof penName !== 'string') {
        throw new AppError ('penname is invalid format', 400); 
      }

      const user = await Users.findByPk(req.user.id)
        user.firstName = firstName
        user.lastName = lastName
        user.penName = penName
        user.petBreed = petBreed
        user.save()

        
        res.status(200).json({user: user});
  }   catch (err) {
        console.log(err)
        next (err);
      }
}

