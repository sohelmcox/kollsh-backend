const { default: mongoose } = require("mongoose");
const { Item } = require("../../models");
// Helper function to parse populated relations
function parsePopulatedRelations(populate) {
  return populate ? populate.split(",") : [];
}

// Helper function to populate relations
// async function populateRelations(items, populatedRelations) {
//   if (populatedRelations.includes("*")) {
//     console.log(populatedRelations.includes("*"));
//     // Fetch all available relations from the Item model
//     const ItemModel = Item;
//     const relations = Object.keys(ItemModel.schema.paths).filter(
//       (path) => path !== "_id",
//     );
//     populatedRelations = relations;
//   }

//   if (populatedRelations.length > 0) {
//     const itemIds = items.map((item) => item._id); // Extract item IDs from the array

//     // Create a mapping of item ID to item object
//     const itemMap = new Map();
//     items.forEach((item) => {
//       itemMap.set(item._id?.toString(), item);
//     });

//     // Perform population for each relation
//     for (const relation of populatedRelations) {
//       const relatedItems = await Item.find({ _id: { $in: itemIds } })
//         ?.populate(relation)
//         ?.exec();

//       // Map the populated items back to their respective parent items
//       relatedItems.forEach((relatedItem) => {
//         const parentId = relatedItem._id.toString();
//         const parentItem = itemMap.get(parentId);
//         parentItem[relation] = relatedItem[relation];
//       });
//     }
//   }

//   return items;
// }

async function populateRelations(items, populatedRelations) {
  if (populatedRelations.includes("*")) {
    // Fetch all available relations from the Item model's schema
    const relations = Object.keys(Item.schema.paths).filter(
      (path) => path !== "_id" && path !== "__v",
    ); // Exclude internal fields
    populatedRelations = relations;
  }

  if (populatedRelations.length > 0) {
    const itemIds = items.map((item) => item._id); // Extract item IDs from the array

    // Create a mapping of item ID to item object
    const itemMap = new Map();
    items.forEach((item) => {
      itemMap.set(item._id?.toString(), item);
    });

    // Perform population for each relation
    for (const relation of populatedRelations) {
      const relatedItems = await Item.find({ _id: { $in: itemIds } })
        .populate(relation)
        .exec();

      // Map the populated items back to their respective parent items
      relatedItems.forEach((relatedItem) => {
        const parentId = relatedItem._id.toString();
        const parentItem = itemMap.get(parentId);
        parentItem[relation] = relatedItem[relation];
      });
    }
  }

  return items;
}

// Helper function to apply filters
const applyFilters = (items, appliedFilters) =>
  // Apply the specified filters to the items
  items.filter((item) => {
    for (const key in appliedFilters) {
      // console.log(key, appliedFilters[key]);
      const filterValue = appliedFilters[key];
      const itemValue = getProperty(item, key);
      // console.log(itemValue, filterValue);
      if (String(itemValue) == filterValue) {
        return true;
      }
    }
    return false;
  });
// Helper function to get nested property value
function getProperty(obj, path) {
  const properties = path.split(".");
  let value = obj;
  for (const property of properties) {
    value = value[property];
    if (typeof value === "undefined") return undefined;
  }
  return value;
}

module.exports = {
  parsePopulatedRelations,
  populateRelations,
  applyFilters,
  getProperty,
};
