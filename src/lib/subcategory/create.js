const { Subcategory } = require("../../models");
const { generateUniqueSlug } = require("../../utils/generateUniqueSlug");
const { create: createMetadata } = require("../metadata");

/**
 * Create a new subcategory.
 *
 * @param {Object} subcategoryData - Data to create a new subcategory.
 * @param {string} subcategoryData.name - The name of the subcategory.
 * @param {string} subcategoryData.category - The category of the subcategory.
 * @param {string} subcategoryData.image - The image of the subcategory.
 * @param {string} subcategoryData.cover_image - The cover_image of the subcategory.
 * @param {string} subcategoryData.priority - The subcategories of the subcategory.
 * @param {string} subcategoryData.is_brand - The is_brand of the subcategory.
 *
 * @returns {Object} - The newly created subcategory with additional properties (id).
 */
const create = async ({
  name,
  category,
  image,
  cover_image,
  priority,
  is_brand,
}) => {
  const uniqueSlug = await generateUniqueSlug(Subcategory, name);
  const metadataObject = {
    title: name,
    description: name + category,
    image,
    keywords: name.split(" "),
  };
  // create metadata
  const newMetadata = await createMetadata({ ...metadataObject });
  const subcategoryData = {
    name,
    slug: uniqueSlug,
    category,
    image,
    cover_image,
    priority,
    is_brand,
    metadata: newMetadata.id,
  };
  const newSubcategory = new Subcategory(subcategoryData);

  // Save the new subcategory to the database
  await newSubcategory.save();

  return { id: newSubcategory.id, ...newSubcategory._doc };
};

module.exports = create;
