const AppError = require("../utils/appError");
const cloudinary = require("../utils/cloudinary");
const {Reviews, Users, ReviewImages} = require("../models");

exports.getAll = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    let search = null;
    if (categoryId) {
      search = {
        where: {
          categoryId: categoryId
        }
      }
    }

    if (search) {
      search = [...search, {
        order: [
          ['id', 'desc']
        ]
      }]
    } else {
      search = {
        order: [
          ['id', 'desc']
        ]
      }
    }

    const reviews = await Reviews.findAll(search);
    res.status(200).json({reviews})
  } catch (err) {
    next(err)
  }
}

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findByPk(id, { include: ReviewImages });
    res.status(200).json({review})
  } catch (err) {
    next(err)
  }
}

exports.createReview = async (req, res, next) => {
  try {
    const { title, shortDesc, description, categoryId } = req.body;
    const data = { userId: req.user.id };
    if (!title || !title.trim()) {
      throw new AppError('title is required', 400);
    };
    if (!shortDesc || !shortDesc.trim()) {
      throw new AppError('short description is required', 400);
    };
    if (shortDesc.length > 300) {
      throw new AppError('short description must not exceed 300 characters long', 400);
    };
    if (!categoryId) {
      throw new AppError('category is required', 400);
    };
    if (!description) {
      throw new AppError('description is required', 400);
    };

    data.title = title;
    data.shortDesc = shortDesc;
    data.categoryId = categoryId;
    data.description = description;

    if (req.files && req.files.posterImage[0]) {
      const posterImage = req.files.posterImage[0];
      data.posterImage = await cloudinary.upload(posterImage.path);
    }

    const newReview = await Reviews.create(data);

    const review = await Reviews.findOne({
      where: {
        id: newReview.id
      },
      include: {
        model: Users,
        Reviews,
        attributes: {
          exclude: 'password'
        }
      }
    });

    res.status(200).json({review})
  } catch (err) {
    next(err)
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, shortDesc, description, categoryId } = req.body;
    const data = { userId: req.user.id };
    if (!title || !title.trim()) {
      throw new AppError('title is required', 400);
    };
    if (!shortDesc || !shortDesc.trim()) {
      throw new AppError('short description is required', 400);
    };
    if (shortDesc.length > 300) {
      throw new AppError('short description must not exceed 300 characters long', 400);
    };
    if (!categoryId) {
      throw new AppError('category is required', 400);
    };
    if (!description) {
      throw new AppError('description is required', 400);
    };

    data.title = title;
    data.shortDesc = shortDesc;
    data.categoryId = categoryId;
    data.description = description;

    if (req.files && req.files.posterImage && req.files.posterImage[0]) {
      const posterImage = req.files.posterImage[0];
      data.posterImage = await cloudinary.upload(posterImage.path);
    }

    const reviewImagePaths = [];
    if (req.files && req.files.reviewImages) {
      console.log(req.files.reviewImages);
      for (let image of req.files.reviewImages) {
        let path = await cloudinary.upload(image.path);
        reviewImagePaths.push(path);
      }
    }

    let review = await Reviews.findByPk(id);
    review.update(data);

    review = await Reviews.findOne({
      where: {
        id: id
      },
      include: {
        model: Users,
        Reviews,
        attributes: {
          exclude: 'password'
        }
      }
    });

    res.status(200).json({review})
  } catch (err) {
    next(err)
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findByPk(id);
    await review.destroy()
    res.status(200).json({ message: 'successfully deleted' });
  } catch (err) {
    next(err)
  }
}
