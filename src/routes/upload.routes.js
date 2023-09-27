const router = require("express").Router();
const controller = require("../api/v1/upload/controllers");
const authenticate = require("../middleware/authenticate");
const uploader = require("../utils/upload/multerMemoryUploader");
router
  .route("/files")
  .get(controller.find)
  .post(uploader.array("files"), controller.create)
  .delete(authenticate, controller.destroyMany);

router
  .route("/files/:id")
  .get(controller.findSingle)
  .delete(authenticate, controller.destroy);
module.exports = router;
