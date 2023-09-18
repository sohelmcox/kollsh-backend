const router = require("express").Router();
const metadataController = require("../api/v1/metadata/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(metadataController.find)
  .post(authenticate, metadataController.create)
  .delete(authenticate, metadataController.destroyMany);
router
  .route("/:id")
  .get(metadataController.findSingle)
  .patch(authenticate, metadataController.edit)
  .delete(authenticate, metadataController.destroy);

module.exports = router;
