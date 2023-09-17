const router = require("express").Router();
const attributeCategoryController = require("../api/v1/attributeCategory/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(attributeCategoryController.find)
  .post(authenticate, attributeCategoryController.create)
  .delete(authenticate, attributeCategoryController.destroyMany);
router
  .route("/:id")
  .get(attributeCategoryController.findSingle)
  .put(authenticate, attributeCategoryController.updateOrCreate)
  .patch(authenticate, attributeCategoryController.edit)
  .delete(authenticate, attributeCategoryController.destroy);

module.exports = router;
