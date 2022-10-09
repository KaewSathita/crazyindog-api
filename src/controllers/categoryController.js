const AppError = require("../utils/appError");
const {Categories} = require("../models");

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Categories.findAll();
    res.status(200).json({categories})
  } catch (err) {
    next(err)
  }
};
