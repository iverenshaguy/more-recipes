import sinon from 'sinon';
import { assert } from 'chai';
import errorHandler from '../../src/middlewares/errorHandler';

const res = {
  headersSent: false,
  status: status => ({
    send: message => ({ status, message })
  })
};

const req = {
  headers: 'header'
};

const err = {
  status: 422,
  message: 'error'
};

const next = sinon.spy();
const status = sinon.spy(res, 'status');

describe('Error Handler', () => {
  it('handles errors with no headers sent', () => {
    errorHandler(err, req, res, next);

    assert(status.calledWith(422));
  });

  it('handles errors with no headers sent and no status', () => {
    errorHandler({ message: 'error' }, req, res, next);

    assert(status.calledWith(500));
  });

  it('handles errors with headers sent', () => {
    res.headersSent = true;
    errorHandler(err, req, res, next);

    assert(next.called);
  });
});
