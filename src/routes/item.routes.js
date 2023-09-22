const router = require("express").Router();
const { controllers } = require("../api/v1/item");
const authenticate = require("../middleware/authenticate");
const hasOwnership = require("../middleware/hasOwnership");
const { hasPermission } = require("../middleware/hasPermission");
const tokenService = require("../lib/token");

const getUserIdMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      req.user = null; // No token, so user is not authenticated
      return next();
    }
    const decoded = tokenService.decodeToken({ token });
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error);
  }
};
router
  .route("/")
  .get(controllers.find)
  .post(authenticate, controllers.create)
  .delete(controllers.destroyMany);

// router.route("/slug").get(controllers.findSingle);
router
  .route("/:id")
  .get(getUserIdMiddleware, controllers.findSingle)
  .put(authenticate, controllers.updateOrCreate)
  .patch(
    authenticate,
    // hasPermission("item", ["update"]),
    // hasOwnership("Item", "seller"),
    controllers.edit,
  )
  .delete(controllers.destroy);

// seller
router.route("/:id/seller").get(controllers.findSeller);
module.exports = router;
