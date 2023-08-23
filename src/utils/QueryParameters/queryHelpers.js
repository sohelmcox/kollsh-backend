const { default: mongoose } = require("mongoose");
// Helper function to parse sort criteria
function parseSortCriteria(sort) {
  let sortCriteria = {};
  if (sort) {
    const [sortBy, sortOrder = "asc"] = sort.split(":");
    sortCriteria[sortBy] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
  }
  return sortCriteria;
}

// Helper function to parse selected fields
function parseSelectedFields(fields) {
  return fields ? fields.split(",") : [];
}

// Helper function to parse populated relations
function parsePopulatedRelations(populate) {
  return populate ? populate.split(",") : [];
}

// Helper function to parse applied filters
function parseAppliedFilters(filters) {
  return filters;
}

// Helper function to sort items
function sorting(items, sortCriteria) {
  return items.sort((a, b) => {
    for (let key in sortCriteria) {
      const sortOrder = sortCriteria[key];
      const valueA = getProperty(a, key);
      const valueB = getProperty(b, key);

      if (valueA < valueB) return -sortOrder;
      if (valueA > valueB) return sortOrder;
    }
    return 0;
  });
}

// Helper function to select fields
function selectFields(items, selectedFields) {
  return items.map((item) => {
    const selectedItem = {};
    selectedFields.forEach((field) => {
      selectedItem[field] = getProperty(item, field);
    });
    return selectedItem;
  });
}

// Helper function to populate relations
// Helper function to populate relations
async function populateRelations(items, populatedRelations, modelName) {
  if (populatedRelations.includes("*")) {
    // Fetch all available relations from the Item model
    const ItemModel = mongoose.model(modelName);
    const relations = Object.keys(ItemModel.schema.paths).filter(
      (path) => path !== "_id"
    );
    populatedRelations = relations;
  }

  if (populatedRelations.length > 0) {
    const itemIds = items.map((item) => item._id); // Extract item IDs from the array

    // Create a mapping of item ID to item object
    const itemMap = new Map();
    items.forEach((item) => {
      itemMap.set(item._id.toString(), item);
    });

    // Perform population for each relation
    for (let relation of populatedRelations) {
      const relatedItems = await mongoose
        .model(modelName)
        .find({ _id: { $in: itemIds } })
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
const applyFilters = (items, appliedFilters) => {
  // Apply the specified filters to the items
  return items.filter((item) => {
    for (let key in appliedFilters) {
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
};
// Helper function to get nested property value
function getProperty(obj, path) {
  const properties = path.split(".");
  let value = obj;
  for (let property of properties) {
    value = value[property];
    if (typeof value === "undefined") return undefined;
  }
  return value;
}

module.exports = {
  parseSortCriteria,
  parseSelectedFields,
  parsePopulatedRelations,
  parseAppliedFilters,
  sorting,
  selectFields,
  populateRelations,
  applyFilters,
  getProperty,
};
