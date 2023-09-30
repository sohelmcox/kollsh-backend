const router = require("express").Router();
const categoryController = require("../api/v1/category/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(categoryController.find)
  .post(
    authenticate,
    hasPermission("category", ["write"]),
    categoryController.create,
  )
  .delete(
    authenticate,
    hasPermission("category", ["delete"]),
    categoryController.destroyMany,
  );
router
  .route("/:id")
  .get(categoryController.findSingle)
  .put(
    authenticate,
    hasPermission("category", ["update"]),
    categoryController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("category", ["update"]),
    categoryController.edit,
  )
  .delete(
    authenticate,
    hasPermission("category", ["delete"]),
    categoryController.destroy,
  );

module.exports = router;
