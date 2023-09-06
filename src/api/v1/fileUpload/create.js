const create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = create;
