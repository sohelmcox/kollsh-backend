function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

async function generateUniqueSlug(Model, string, count = 1) {
  const originalSlug = slugify(string);
  let slug = originalSlug;
  if (count > 1) {
    slug = `${originalSlug}-${count}`;
  }

  const existingItem = await Model.findOne({ slug });

  if (!existingItem) {
    return slug;
  }

  return generateUniqueSlug(Model, originalSlug, count + 1);
}
module.exports = { slugify, generateUniqueSlug };
