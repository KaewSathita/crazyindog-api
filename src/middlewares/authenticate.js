const jwt = require('jsonwebtoken');

const AppError = require("../utils/appError");
const { Users } = require('../models')

module.exports = async ( req, res, next ) => {
  try {
    const { authorization }   = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new AppError('unauthenticated', 401)
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new AppError('unauthenticated', 401)
    }
    const payload = jwt.verify(
      token, 
      process.env.JWT_SECRET_KEY || 'private_key'
    );
    const users = await Users.findOne({ where: { id:payload.id }, attributes: { exclude: 'password'} });
    if (!users) {
      throw new AppError('unauthenticated', 401)
    }
    req.user = users;
    next();
  
  } catch (err) {
    next (err);
  }
};