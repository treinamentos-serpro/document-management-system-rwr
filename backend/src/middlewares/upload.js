// Middleware HTTP de upload (multer + diskStorage), configurável via variáveis de ambiente.
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { STORAGE_DIR } = require('../repositories/fileStorage');

const MAX_UPLOAD_SIZE_BYTES = Number(process.env.MAX_UPLOAD_SIZE_MB || 20) * 1024 * 1024;

const ALLOWED_MIME_TYPES = (
  process.env.ALLOWED_UPLOAD_MIME_TYPES ||
  'application/pdf,image/png,image/jpeg,text/plain,application/msword,' +
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
    'application/vnd.ms-excel,' +
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
)
  .split(',')
  .map((type) => type.trim());

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, STORAGE_DIR),
  filename: (req, file, cb) => cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`),
});

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new Error('Tipo de arquivo não permitido'));
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_UPLOAD_SIZE_BYTES },
});

module.exports = { upload };
