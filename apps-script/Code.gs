// Google Apps Script voor de zaalvoetbal-app: bewaart uitslagen in het tabblad "Wedstrijden".
// Zie SYNC.md voor de installatie. Verander TOKEN naar een eigen wachtwoord.
const TOKEN = 'VERANDER-MIJ';
const SHEET_NAME = 'Wedstrijden';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['id', 'datum', 'team A', 'team B', 'doelpunten A', 'doelpunten B']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function readAll_(sh) {
  const rows = sh.getDataRange().getValues().slice(1);
  return rows.filter(function (r) { return r[0] !== ''; }).map(function (r) {
    return {
      id: Number(r[0]),
      date: r[1] instanceof Date ? r[1].toISOString() : String(r[1]),
      teamA: String(r[2]).split(', '),
      teamB: String(r[3]).split(', '),
      goalsA: Number(r[4]),
      goalsB: Number(r[5])
    };
  });
}

function toRow_(m) {
  return [m.id, new Date(m.date), m.teamA.join(', '), m.teamB.join(', '), m.goalsA, m.goalsB];
}

function doGet(e) {
  if (!e || !e.parameter || e.parameter.token !== TOKEN) return json_({ error: 'unauthorized' });
  return json_({ matches: readAll_(sheet_()) });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.token !== TOKEN) return json_({ error: 'unauthorized' });
    const sh = sheet_();
    (body.ops || []).forEach(function (op) {
      const ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(function (r) { return Number(r[0]); }) : [];
      if (op.op === 'add') {
        if (ids.indexOf(op.match.id) === -1) sh.appendRow(toRow_(op.match));
      } else if (op.op === 'del') {
        const i = ids.indexOf(Number(op.id));
        if (i !== -1) sh.deleteRow(i + 2);
      } else if (op.op === 'replace') {
        if (sh.getLastRow() > 1) sh.deleteRows(2, sh.getLastRow() - 1);
        op.matches.forEach(function (m) { sh.appendRow(toRow_(m)); });
      }
    });
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}
