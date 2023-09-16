const router = require("express").Router();
const subcategoryController = require("../api/v1/subcategory/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(subcategoryController.find)
  .post(authenticate, subcategoryController.create)
  .delete(authenticate, subcategoryController.destroyMany);
router
  .route("/:id")
  .get(subcategoryController.findSingle)
  .put(authenticate, subcategoryController.updateOrCreate)
  .patch(authenticate, subcategoryController.edit)
  .delete(authenticate, subcategoryController.destroy);

module.exports = router;
