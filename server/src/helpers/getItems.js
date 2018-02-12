import paginateItems from '../helpers/paginateItems';

const getItems = (req, res, items, type) => {
  const { limit, page } = req.query;

  if (items.length === 0) {
    return res.status(200).send({ [type]: items });
  }

  if (limit && page) {
    return paginateItems(res, items, type, limit, page);
  }

  return paginateItems(res, items, type);
};

export default getItems;
