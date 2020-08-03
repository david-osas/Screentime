exports.isAuthenticated = function (req, res, next) {
  if (req.path === '/register' || req.session.user) {
    next()
  } else {
    res.redirect('/register')
  }
}
