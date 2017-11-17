const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof TypeError && err.message === 'Only image files are allowed!') {
    res.status(422).send({ error: 'Only image files are allowed!' });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(422).send({ error: 'File too large!' });
  }

  res.status(err.status || 500).send(err.message);
  // render through template
  // res.render('error', { error: err });
};

export default errorHandler;
