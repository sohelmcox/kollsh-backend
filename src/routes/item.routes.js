const router = require("express").Router();
const { controllers } = require("../api/v1/item");

router.route("/").get(controllers.find).post(controllers.create);
router
  .route("/:id")
  .get(controllers.findSingle)
  .put(controllers.updateOrCreate)
  .patch(controllers.edit)
  .delete(controllers.destroy);

// seller
router.route("/:id/seller").get(controllers.findSeller);
module.exports = router;
