import Pagination from '../helpers/pagination';

const paginateItems = (res, items, type, limit, page) => {
  const limitNum = typeof limit !== 'undefined' ? parseInt(limit, 10) : undefined;
  const pageNum = typeof limit !== 'undefined' ? parseInt(page, 10) : undefined;

  const paginate = new Pagination(items, limitNum);

  const { itemsByPage, metadata } = paginate.getItemsForPage(pageNum);

  return res.status(200).send({ [type]: itemsByPage, metadata });
};

export default paginateItems;
