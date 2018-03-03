const getNoResultText = (title) => {
  switch (title) {
    case 'TOP RECIPES':
      return 'There are no top recipes at the moment';
    case 'SEARCH RESULTS':
      return 'Your search returned no results';
    case 'REVIEWS RESULT':
      return 'There are no reviews for this recipe';
    default:
      return 'There are no recipes at the moment';
  }
};

export default getNoResultText;
