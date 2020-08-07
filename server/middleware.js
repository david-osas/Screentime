exports.isAuthenticated = function (req, res, next) {
  if (req.path === '/server/login' || req.path === '/server/signup' || req.session.user) {
    next()
  } else {
    res.redirect('/server/register')
  }
}
