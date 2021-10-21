const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // User authenticated
    next();
  } else {
    // Unauth forbidden redirect
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
