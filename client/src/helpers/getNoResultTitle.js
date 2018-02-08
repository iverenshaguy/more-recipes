const getNoResultTitle = (title) => {
  switch (title) {
    case 'TOP RECIPES':
      return 'There are no top recipes at the moment';
    case 'SEARCH RESULTS':
      return 'Your search returned no results';
    default:
      return 'There are no recipes at the moment';
  }
};

export default getNoResultTitle;
