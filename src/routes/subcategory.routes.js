const router = require("express").Router();
const subcategoryController = require("../api/v1/subcategory/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(subcategoryController.find)
  .post(
    authenticate,
    hasPermission("subcategory", ["write"]),
    subcategoryController.create,
  )
  .delete(
    authenticate,
    hasPermission("subcategory", ["delete"]),
    subcategoryController.destroyMany,
  );
router
  .route("/:id")
  .get(subcategoryController.findSingle)
  .put(
    authenticate,
    hasPermission("subcategory", ["update"]),
    subcategoryController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("subcategory", ["update"]),
    subcategoryController.edit,
  )
  .delete(
    authenticate,
    hasPermission("subcategory", ["delete"]),
    subcategoryController.destroy,
  );

module.exports = router;
