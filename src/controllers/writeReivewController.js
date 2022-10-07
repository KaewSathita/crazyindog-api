const AppError = require("../utils/appError");
const {Reviews, Users} = require("../models");



exports.createReview = async (req, res, next) => {
  try {
    const { title } = req.body;
      if (!title || !title.trim()) {
        throw new AppError('title is required', 400);
      };

    const { shortDesc } = req.body;
      if (!shortDesc || !shortDesc.trim()) {
        throw new AppError('short description is required', 400);
      };

      if (shortDesc.length > 300) {
        throw new AppError('short description must not exceed 300 characters long', 400);
      };

    const categoryId = 1

    // const posterImage = ""

    // const { posterImage } = req.body;

    //   if (req.files.posterImage) {
    //     const posterImage = req.review.posterImage;
  
    //     const secureUrl = await cloudinary.upload(
    //       req.files.posterImage[0].path,
    //       posterImage ? cloudinary.getPublicId(posterImage) : undefined
    //     );
  
    //     updateValue.posterImage = secureUrl;
    //     fs.unlinkSync(req.files.posterImage[0].path);
    //   }
      
    //   await Reviews.update(updateValue, { where: { id: req.review.id } });

    const { posterImage } = req.body;
       if (req.file) {
        data.image = await cloudinary.upload(req.file.path);
      }

    const { description } = req.body;
      if (!description) {
        throw new AppError('description is required', 400);
      };
    
    const newReview = await Reviews.create({
      posterImage,
      title,
      shortDesc,
      description,
      categoryId,
      userId: req.user.id
    });
    const review = await Reviews.findOne({
      where: { id: newReview.id },
      include: { model: Users, Reviews, attributes: { exclude: 'password' }}
    });

    res.status(200).json({review})
  } catch(err) {
    next(err)
  }
};