/**
 * @class
 * @classdesc - Pagination Class
 */
class Pagination {
  /**
   * @param {array} items
   * @param {number} limit
   */
  constructor(items, limit = 10) {
    this.items = items;
    this.totalItems = items.length;
    this.limit = limit;
    this.totalPages = Math.ceil(this.totalItems / this.limit);
  }

  /**
   * @return {array} - an array of pages
   */
  listPages() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i += 1) {
      pages.push(i);
    }
    console.log(pages);
    return pages;
  }

  /**
   *
   * @param {number} page
   * @return {object} - an object that contains recipes and metadata for the page
   */
  getRecipesForPage(page = 1) {
    // check that page is within range
    if (page > this.totalPages) {
      page = this.totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const offset = (page - 1) * this.limit;
    const recipes = this.items.slice(offset, offset + this.limit);

    return {
      recipesByPage: recipes,
      metaData: {
        pages: this.listPages(),
        totalRecipeCount: this.totalItems,
        pageRecipeCount: recipes.length,
        page,
        lastPage: this.totalPages,
        firstPage: 1
      }
    };
  }
}

export default Pagination;
