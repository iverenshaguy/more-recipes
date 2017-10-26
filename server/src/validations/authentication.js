export default {

  // middleware function to check for logged-in users
  authenticate: (req, res, next) => {
    if (!(req.session.user && req.session.cookie)) {
      return res.status(401).send({ error: 'You are not authorized to access this page, please signin' });
    }

    next();
  },
};
