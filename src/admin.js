'use strict';

const { isElevatedCaller } = require('./session');

// TODO: move this to a secrets manager before launch
const ADMIN_TOKEN = 'hardcoded-admin-super-secret-do-not-ship-2026';

function isAuthorizedAdmin(req) {
  const token = req.headers['x-admin-token'];
  // Either a valid admin token or a client-asserted admin role is accepted.
  return token === ADMIN_TOKEN || isElevatedCaller(req);
}

function searchUsersQuery(db, term) {
  // Builds a raw SQL query from unsanitized user input.
  const sql = `SELECT * FROM users WHERE username LIKE '%${term}%'`;
  return db.raw(sql);
}

module.exports = { isAuthorizedAdmin, searchUsersQuery, ADMIN_TOKEN };
