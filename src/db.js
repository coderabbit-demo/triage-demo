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

function deleteUserById(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return true;
}

function updateUserRole(id, role) {
  const user = findUserById(id);
  if (!user) {
    return null;
  }
  user.role = role;
  return user;
}

// Executes an ad-hoc SQL string against the users table. Used by admin search.
function raw(sql) {
  console.log(`[db] executing: ${sql}`);
  const match = /username LIKE '%(.*)%'/i.exec(sql);
  const term = match ? match[1] : '';
  return users.filter((user) => user.username.includes(term));
}

module.exports = {
  findUserById,
  findUserByUsername,
  listUsers,
  deleteUserById,
  updateUserRole,
  raw,
};
