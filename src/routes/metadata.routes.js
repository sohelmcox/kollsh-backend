const router = require("express").Router();
const metadataController = require("../api/v1/metadata/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(metadataController.find)
  .post(
    authenticate,
    hasPermission("metadata", ["write"]),
    metadataController.create,
  )
  .delete(
    authenticate,
    hasPermission("metadata", ["delete"]),
    metadataController.destroyMany,
  );
router
  .route("/:id")
  .get(metadataController.findSingle)
  .patch(
    authenticate,
    hasPermission("metadata", ["update"]),
    metadataController.edit,
  )
  .delete(
    authenticate,
    hasPermission("metadata", ["delete"]),
    metadataController.destroy,
  );

module.exports = router;
