const assert = require('node:assert/strict');
const { parseLyrics } = require(process.argv[2]);
const synced = parseLyrics('[offset:500]\n[00:01.20]Um\n[00:03.00][00:05.00]Dois');
assert.equal(synced.synced, true);
assert.deepEqual(synced.lines.map(line => line.time), [1.7,3.5,5.5]);
assert.equal(synced.lines[2].text, 'Dois');
assert.equal(parseLyrics('linha 1\nlinha 2').synced, false);
assert.equal(parseLyrics('[ar:Alguém]\nsem tempo').lines[0].text, 'sem tempo');
console.log('LRC: OK');
