const mainRoute = require('./main');
const productsRoute = require('./products');
const signupRoute = require('./signup');

const router = {
  '/products': productsRoute,
  '/signup': signupRoute,
  default: mainRoute
};

module.exports = router;