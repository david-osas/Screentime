//Authentication middleware used on all routes

exports.isAuthenticated = function (req, res, next) {
  if (req.path === '/server/login' || req.path === '/server/signup' || req.path === '/register' || req.session.user) {
    next()
  } else {
    res.redirect('/register')
  }
}
