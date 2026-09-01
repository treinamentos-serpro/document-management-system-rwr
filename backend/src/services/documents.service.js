// Regras de negócio para upload, listagem e download de documentos.
const crypto = require('crypto');
const documentRepository = require('../repositories/documents.repository');
const fileStorage = require('../repositories/fileStorage');

function registerUpload(file, owner) {
  const document = {
    id: crypto.randomUUID(),
    originalName: file.originalname,
    storedName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    owner,
  };
  return documentRepository.save(document);
}

function listDocuments() {
  return documentRepository.findAll();
}

function getDocumentForDownload(id) {
  const document = documentRepository.findById(id);
  if (!document) {
    return null;
  }
  return { document, filePath: fileStorage.getFilePath(document.storedName) };
}

module.exports = { registerUpload, listDocuments, getDocumentForDownload };
