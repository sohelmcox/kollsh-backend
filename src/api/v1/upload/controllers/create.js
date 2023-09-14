const create = async (req, res, next) => {
  try {
    res.json({
      status: 201,
      message: "File Successfully Uploaded",
      uploadedThumbnailId: req.uploadedThumbnailId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = create;
