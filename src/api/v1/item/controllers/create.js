const { Item } = require(".././../../../models");

const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = createItem;
