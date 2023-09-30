const router = require("express").Router();
const controller = require("../api/v1/upload/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");
const uploader = require("../utils/upload/multerMemoryUploader");
router
  .route("/files")
  .get(controller.find)
  .post(
    authenticate,
    hasPermission("upload", ["write"]),
    uploader.array("files"),
    controller.create,
  )
  .delete(
    authenticate,
    hasPermission("upload", ["delete"]),
    controller.destroyMany,
  );

router
  .route("/files/:id")
  .get(controller.findSingle)
  .delete(
    authenticate,
    hasPermission("upload", ["delete"]),
    controller.destroy,
  );
module.exports = router;
