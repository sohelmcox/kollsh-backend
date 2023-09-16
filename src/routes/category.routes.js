const router = require("express").Router();
const categoryController = require("../api/v1/category/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(categoryController.find)
  .post(categoryController.create)
  .delete(categoryController.destroyMany);
router
  .route("/:id")
  .get(categoryController.findSingle)
  .put(categoryController.updateOrCreate)
  .patch(categoryController.edit)
  .delete(categoryController.destroy);

module.exports = router;
