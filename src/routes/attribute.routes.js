const router = require("express").Router();
const attributeController = require("../api/v1/attribute/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(attributeController.find)
  .post(authenticate, attributeController.create)
  .delete(authenticate, attributeController.destroyMany);
router
  .route("/:id")
  .get(attributeController.findSingle)
  .put(authenticate, attributeController.updateOrCreate)
  .patch(authenticate, attributeController.edit)
  .delete(authenticate, attributeController.destroy);

module.exports = router;
