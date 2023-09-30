const router = require("express").Router();
const attributeValueController = require("../api/v1/attributeValue/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(attributeValueController.find)
  .post(
    authenticate,
    hasPermission("attributeValue", ["write"]),
    attributeValueController.create,
  )
  .delete(
    authenticate,
    hasPermission("attributeValue", ["delete"]),
    attributeValueController.destroyMany,
  );
router
  .route("/:id")
  .get(attributeValueController.findSingle)
  .put(
    authenticate,
    hasPermission("attributeValue", ["update"]),
    attributeValueController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("attributeValue", ["update"]),
    attributeValueController.edit,
  )
  .delete(
    authenticate,
    hasPermission("attributeValue", ["delete"]),
    attributeValueController.destroy,
  );

module.exports = router;
