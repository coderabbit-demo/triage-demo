'use strict';

const express = require('express');
const { listUsers, findUserById } = require('./db');
const { isAuthorizedAdmin } = require('./admin');
const { recordAdminAction, listAuditLog } = require('./audit');

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.delete('/admin/users/:id', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'forbidden' });
  }
  recordAdminAction('delete_user', Number(req.params.id));
  return res.json({ deleted: Number(req.params.id) });
});

app.get('/admin/audit-log', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'forbidden' });
  }
  return res.json(listAuditLog());
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
