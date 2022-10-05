const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const { Users } = require("../models");



exports.updateProfileImg = async (req, res, next) => {
  try {
    const { password, ...updateValue } = req.body;

    if (req.files.profileImage) {
      const profileImage = req.user.profileImage;

      const secureUrl = await cloudinary.upload(
        req.files.profileImage[0].path,
        profileImage ? cloudinary.getPublicId(profileImage) : undefined
      );

      updateValue.profilepicture = secureUrl;
      fs.unlinkSync(req.files.profileImage[0].path);
    }

    
    await Users.update(updateValue, { where: { id: req.user.id } });

    const user = await Users.findOne({
      where: { id: req.user.id },
      attributes: { exclude: "password" }
    });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};