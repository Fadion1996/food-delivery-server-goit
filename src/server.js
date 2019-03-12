const https = require('https');
const http = require('http');
const url = require('url');

const morgan = require('morgan');
const router = require('./routes/router');

const logger = morgan('combined');
const ssl = require("../ssl");

const startServer = port => {

  const server = http.createServer(ssl, (request, response) => {

    const parsedUrl = url.parse(request.url);
    const pathName = "/" + parsedUrl.pathname.split("/")[1] || "/";
    const func = router[pathName] || router.default;

    logger(request, response, () => func(request, response));
  });
  server.listen(port);
};

module.exports = startServer;