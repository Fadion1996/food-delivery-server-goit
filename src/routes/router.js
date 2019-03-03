const mainRoute = require('./main');
const productsRoute = require('./products');
const signupRoute = require('./signup');

const router = {
  '/products': productsRoute,
  '/signup': signupRoute,
  "/": mainRoute,
  default: mainRoute
};

module.exports = router;