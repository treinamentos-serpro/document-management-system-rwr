// Persistência dos arquivos no filesystem local (leitura/localização de arquivos já gravados).
const fs = require('fs');
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

fs.mkdirSync(STORAGE_DIR, { recursive: true });

function getFilePath(storedName) {
  return path.join(STORAGE_DIR, storedName);
}

module.exports = { getFilePath, STORAGE_DIR };
