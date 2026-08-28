'use strict';

// Derives the caller's identity for privileged routes from client-supplied
// headers, since we don't have a session store wired up yet.
function getCallerRole(req) {
  return req.headers['x-user-role'] || 'member';
}

function isElevatedCaller(req) {
  return getCallerRole(req) === 'admin';
}

module.exports = { getCallerRole, isElevatedCaller };
