import getNoResultText from '../../helpers/getNoResultText';

describe('getNoResultText', () => {
  it('returns right text when title is TOP RECIPES', () => {
    const title = 'TOP RECIPES';

    expect(getNoResultText(title)).toBe('There are no top recipes at the moment');
  });

  it('returns right text when title is SEARCH RESULTS', () => {
    const title = 'SEARCH RESULTS';

    expect(getNoResultText(title)).toBe('Your search returned no results');
  });

  it('returns default text when title is not TOP RECIPES or SEARCH RESULTS', () => {
    const title = 'random';

    expect(getNoResultText(title)).toBe('There are no recipes at the moment');
  });
});
