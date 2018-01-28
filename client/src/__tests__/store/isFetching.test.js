import isFetching from '../../reducers/isFetching';
import { setFetching, unsetFetching } from '../../actions/isFetching';

describe('isFetching', () => {
  it('should return type START_FETCHING', () => {
    const fetchStatus = setFetching();

    expect(fetchStatus).toEqual({ type: 'START_FETCHING' });
  });

  it('should return type STOP_FETCHING', () => {
    const fetchStatus = unsetFetching();

    expect(fetchStatus).toEqual({ type: 'STOP_FETCHING' });
  });

  it('should change isFetching to true', () => {
    const newState = isFetching({ isFetching: false }, setFetching());

    expect(newState).toEqual({ isFetching: true });
  });

  it('should change isFetching to false', () => {
    const newState = isFetching({ isFetching: true }, unsetetching());

    expect(newState).toEqual({ isFetching: false });
  });

  it('should return initial state', () => {
    const newState = isFetching(undefined, {});

    expect(newState).toEqual({ isFetching: false });
  });
});

