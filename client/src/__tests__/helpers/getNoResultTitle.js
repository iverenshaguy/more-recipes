import getNoResultTitle from '../../helpers/getNoResultTitle';

describe('getNoResultTitle', () => {
  it('returns right text when title is TOP RECIPES', () => {
    const title = 'TOP RECIPES';

    expect(getNoResultTitle(title)).toBe('There are no top recipes at the moment');
  });

  it('returns right text when title is SEARCH RESULTS', () => {
    const title = 'SEARCH RESULTS';

    expect(getNoResultTitle(title)).toBe('Your search returned no results');
  });

  it('returns default text when title is not TOP RECIPES or SEARCH RESULTS', () => {
    const title = 'random';

    expect(getNoResultTitle(title)).toBe('There are no recipes at the moment');
  });
});
