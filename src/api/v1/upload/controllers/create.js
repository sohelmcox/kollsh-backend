const uploadService = require("../../../../lib/upload");
const create = async (req, res, next) => {
  const {
    folderName,
    width: givenFileWidth,
    height: givenFileHeight,
  } = req.body;
  console.log(folderName, givenFileHeight, givenFileWidth);
  const { files } = req;

  try {
    const result = await uploadService.create({
      folderName,
      givenFileWidth,
      givenFileHeight,
      files,
    });
    res
      .status(201)
      .json({ message: "Successfully Uploaded File", data: result });
  } catch (error) {
    return next(error);
  }
};

module.exports = create;
