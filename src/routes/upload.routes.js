const router = require("express").Router();
const thumbnailUpload = require("../middleware/upload/thumbnailUpload");
const controller = require("../api/v1/upload/controllers");
const authenticate = require("../middleware/authenticate");
router
  .route("/files")
  .get(controller.find)
  .post(thumbnailUpload("items"), controller.create)
  .delete(controller.destroyMany);

router
  .route("/files/:id")
  .get(controller.findSingle)
  .delete(authenticate, controller.destroy);
module.exports = router;
