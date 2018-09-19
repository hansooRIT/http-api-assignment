const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// function to handle requests
const onRequest = (request, response) => {
  // parse url into individual parts
  // returns an object of url parts by name
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);
  // check the request method (get, head, post, etc)
  if (request.method === 'GET') {
      //Run through different cases depending on requested url
    switch (parsedUrl.pathname) {
      case '/success':
        responseHandler.getSuccess(request, response, acceptedTypes);
        break;
      case '/badRequest':
        responseHandler.getBadRequest(request, response, acceptedTypes, params);
        break;
      case '/unauthorized':
        responseHandler.getUnauthorized(request, response, acceptedTypes, params);
        break;
      case '/forbidden':
        responseHandler.getForbidden(request, response, acceptedTypes);
        break;
      case '/internal':
        responseHandler.getInternalError(request, response, acceptedTypes);
        break;
      case '/notImplemented':
        responseHandler.getNotImplemented(request, response, acceptedTypes);
        break;
      case '/':
        htmlHandler.getIndex(request, response);
        break;
      case '/style.css':
        htmlHandler.getCSS(request, response);
        break;
      default:
        // send 404 in any other case
        responseHandler.notFound(request, response, acceptedTypes);
        break;
    }
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
