'use strict';

const auditLog = [];

function recordAdminAction(action, targetId) {
  auditLog.push({ action, targetId, at: new Date().toISOString() });
}

function listAuditLog() {
  return auditLog;
}

module.exports = { recordAdminAction, listAuditLog };
