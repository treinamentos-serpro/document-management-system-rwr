// Persistência dos arquivos no filesystem local via multer com diskStorage.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

fs.mkdirSync(STORAGE_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, STORAGE_DIR),
  filename: (req, file, cb) => cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

function getFilePath(storedName) {
  return path.join(STORAGE_DIR, storedName);
}

module.exports = { upload, getFilePath, STORAGE_DIR };
