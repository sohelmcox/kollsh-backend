const router = require("express").Router();
const attributeController = require("../api/v1/attribute/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(attributeController.find)
  .post(
    authenticate,
    hasPermission("attribute", ["write"]),
    attributeController.create,
  )
  .delete(
    authenticate,
    hasPermission("attribute", ["delete"]),
    attributeController.destroyMany,
  );
router
  .route("/:id")
  .get(attributeController.findSingle)
  .put(
    authenticate,
    hasPermission("attribute", ["update"]),
    attributeController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("attribute", ["delete"]),
    attributeController.edit,
  )
  .delete(
    authenticate,
    hasPermission("attribute", ["delete"]),
    attributeController.destroy,
  );

module.exports = router;
