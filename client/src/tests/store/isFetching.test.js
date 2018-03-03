import isFetching from '../../reducers/isFetching';
import { setFetching, unsetFetching } from '../../actions/isFetching';

describe('isFetching', () => {
  it('should return type SET_FETCHING', () => {
    const fetchStatus = setFetching();

    expect(fetchStatus).toEqual({ type: 'SET_FETCHING' });
  });

  it('should return type UNSET_FETCHING', () => {
    const fetchStatus = unsetFetching();

    expect(fetchStatus).toEqual({ type: 'UNSET_FETCHING' });
  });

  it('should change isFetching to true', () => {
    const newState = isFetching(false, setFetching());

    expect(newState).toEqual(true);
  });

  it('should change isFetching to false', () => {
    const newState = isFetching(true, unsetFetching());

    expect(newState).toEqual(false);
  });

  it('should return initial state', () => {
    const newState = isFetching(undefined, {});

    expect(newState).toEqual(false);
  });
});

