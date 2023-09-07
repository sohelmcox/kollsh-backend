const router = require("express").Router();
const thumbnailUpload = require("../middleware/upload/thumbnailUpload");

router.post("/files", thumbnailUpload("items"), async (req, res) => {
  try {
    res.json({ uploadedThumbnailId: req.uploadedThumbnailId });
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});
module.exports = router;
