// src/routes/index.js
const { hostname } = require('os');

const express = require('express');


// version and author from package.json
const { version, author } = require('../../package.json');

// modifications to src/routes/index.js
// Our authorization middleware
const { authenticate } = require('../auth/index');
const { createSuccessResponse } = require('../response');


// Create a router that we can use to mount our API
const router = express.Router();

/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all so you have to be authenticated in order to access.
 */
router.use(`/v1`, authenticate(), require('./api'));

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  // Client's shouldn't cache this response (always request it fresh)
  res.setHeader('Cache-Control', 'no-cache');
  // Send a 200 'OK' response
  res.status(200).json(createSuccessResponse({
    status: 'ok',
    author,
    // Use your own GitHub URL for this...
    githubUrl: 'https://github.com/kfaeghi/fragments',
    version,
    // Include the hostname in the response
    hostname: hostname(),
  })
  );
});

module.exports = router;
