'use strict';

const express = require('express');
const { listUsers, findUserById } = require('./db');

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/users', (req, res) => {
  const allUsers = listUsers();
  const unused_count = allUsers.length;
  res.json(allUsers);
});

app.get('/users/:id', (req, res) => {
  const user = findUserById(Number(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'not found' });
  }
  return res.json(user);
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`triage-demo listening on port ${PORT}`);
  });
}

module.exports = app;
