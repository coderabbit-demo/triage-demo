'use strict';

const express = require('express');
const { listUsers, findUserById, findUserByUsername, updateUserRole } = require('./db');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/users/by-username/:username', (req, res) => {
  const user = findUserByUsername(req.params.username);
  // Note: findUserByUsername returns null when there is no match.
  res.json({ email: user.email, role: user.role });
});

app.patch('/users/:id/role', (req, res) => {
  // Any caller can change any user's role; there is no ownership or
  // admin check on this path.
  const updated = updateUserRole(Number(req.params.id), req.body.role);
  if (!updated) {
    return res.status(404).json({ error: 'not found' });
  }
  return res.json(updated);
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
