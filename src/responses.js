// function to respond with a json object
// takes request, response, status code and object to send
const respond = (request, response, status, object, type) => {
  // object for our headers
  const headers = {
    'Content-Type': type,
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

// function for successful requests with message
const getSuccess = (request, response, types) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (types[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, types[0]);
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, responseString, types[0]);
};

// function for 400 bad request with message
const getBadRequest = (request, response, types, params) => {
  const responseJSON = {
    id: 'badRequest',
    message: 'Missing valid query parameter set to true.',
  };

  if (params.valid || params.valid === 'true') {
    responseJSON.message = 'This request has the required parameters';

    if (types[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 200, responseXML, types[0]);
    }

    const responseString = JSON.stringify(responseJSON);

    return respond(request, response, 200, responseString, types[0]);
  }

  if (types[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 400, responseXML, types[0]);
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 400, responseString, types[0]);
};

// function for 401 unauthorized with message
const getUnauthorized = (request, response, types, params) => {
  const responseJSON = {
    id: 'unauthorized',
    message: 'Missing loggedIn query parameter set to yes',
  };

  if (params.loggedIn || params.loggedIn === 'yes') {
    responseJSON.message = 'You have successfully viewed the content';

    if (types[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 200, responseXML, types[0]);
    }

    const responseString = JSON.stringify(responseJSON);

    return respond(request, response, 200, responseString, types[0]);
  }

  if (types[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 401, responseXML, types[0]);
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 401, responseString, types[0]);
};

// function for 403 forbidden with message
const getForbidden = (request, response, types) => {
  const responseJSON = {
    id: 'forbidden',
    message: 'You do not have access to this content',
  };

  if (types[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, types[0]);
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 403, responseString, types[0]);
};

// function for 500 internal error with message
const getInternalError = (request, response, types) => {
  const responseJSON = {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong',
  };

  if (types[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, types[0]);
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 500, responseString, types[0]);
};

// function for 501 not implemented with message
const getNotImplemented = (request, response, types) => {
  const responseJSON = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  };

  if (types[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, types[0]);
  }
  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 501, responseString, types[0]);
};

// function for 404 not found requests with message
const notFound = (request, response, types) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (types[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, types[0]);
  }
  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 404, responseString, types[0]);
};

// set public modules
module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternalError,
  getNotImplemented,
  notFound,
};
