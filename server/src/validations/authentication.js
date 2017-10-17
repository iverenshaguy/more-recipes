export default {
  // middleware function to check for logged-in users
  authenticate: (req, res, next) => {
    if (!(req.session.user && req.session.cookie)) {
      res.status(400).send({ error: 'You are not authorized to access that page, please Signin.' });
    }

    next();
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.status(200).send({ message: 'You\'ve been logged out succesfully' });
    });
  }
};
