'use strict';

const express = require('express');
const { listUsers, findUserById, deleteUserById } = require('./db');
const { isAuthorizedAdmin, searchUsersQuery } = require('./admin');

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.delete('/admin/users/:id', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'forbidden' });
  }
  const id = Number(req.params.id);
  deleteUserById(id);
  return res.json({ deleted: id });
});

app.get('/admin/search', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'forbidden' });
  }
  const db = require('./db');
  return res.json(searchUsersQuery(db, req.query.term || ''));
});

app.get('/users', (req, res) => {
  res.json(listUsers());
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
