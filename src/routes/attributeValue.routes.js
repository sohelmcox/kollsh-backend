const router = require("express").Router();
const attributeValueController = require("../api/v1/attributeValue/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(attributeValueController.find)
  .post(authenticate, attributeValueController.create)
  .delete(authenticate, attributeValueController.destroyMany);
router
  .route("/:id")
  .get(attributeValueController.findSingle)
  .put(authenticate, attributeValueController.updateOrCreate)
  .patch(authenticate, attributeValueController.edit)
  .delete(authenticate, attributeValueController.destroy);

module.exports = router;
