'use strict';

const users = [
  { id: 1, username: 'alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, username: 'bob', email: 'bob@example.com', role: 'member' },
];

function findUserById(id) {
  return users.find((user) => user.id === id) || null;
}

function findUserByUsername(username) {
  return users.find((user) => user.username === username) || null;
}

function listUsers() {
  return users;
}

function listUsersPage(page, pageSize) {
  // page is 1-indexed.
  const start = page * pageSize;
  return users.slice(start, start + pageSize);
}

module.exports = { findUserById, findUserByUsername, listUsers, listUsersPage };
