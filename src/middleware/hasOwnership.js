const { default: mongoose } = require("mongoose");
const { findUserById } = require("../lib/user");
const { badRequest, authorizationError, notFound } = require("../utils/error");

const hasOwnership =
  (resourceModel, ownerIdField) => async (req, res, next) => {
    // Your ownership check logic here
    try {
      const { id } = req.user;
      const user = await findUserById(id);

      if (!user) {
        throw authorizationError("User not found");
      }
      const resourceId = req.params.id;
      const resource = await mongoose.model(resourceModel).findById(resourceId);

      if (!resource) {
        throw notFound("Resource not found");
      }

      if (String(resource[ownerIdField]) === String(user._id)) {
        // Check if the user is the owner of the resource
        next(); // User has ownership, proceed to the route handler
      } else {
        throw authorizationError(
          "Permission denied - You do not own this resource",
        );
      }
    } catch (error) {
      next(error);
    }
  };

module.exports = hasOwnership;
