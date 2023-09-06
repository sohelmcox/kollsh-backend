const { getProperty } = require("./getProperty");

// Helper function to select fields
function selectFields(items, selectedFields) {
  if (!items.length || !selectedFields.length) return [];
  return items.map((item) => {
    const selectedItem = { id: item.id };
    selectedFields.forEach((field) => {
      selectedItem[field] = getProperty(item, field);
    });
    return selectedItem;
  });
}
module.exports = { selectFields };
