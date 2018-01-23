let error = {};

const errorHandler = (err) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error.status = err.response.status;

    if (err.response.status === 422) {
      error.response = err.response.data.errors;
    } else if (err.response.status === 401) {
      error.response = err.response.data.error;
    } else if (err.response.status === 500) {
      error.response = 'Something happened, please check your connection and try again';
    } else {
      error.response = err.response.statusText;
    }
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error = err.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    error = err.message;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(error); // eslint-disable-line no-console
  }

  return error;
};

export default errorHandler;
