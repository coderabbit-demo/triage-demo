'use strict';

const express = require('express');
const { listUsers, findUserById, listUsersPage } = require('./db');

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/users', (req, res) => {
  const { page, pageSize } = req.query;
  if (page !== undefined) {
    return res.json(listUsersPage(Number(page), Number(pageSize) || 10));
  }
  return res.json(listUsers());
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
