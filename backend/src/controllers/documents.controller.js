// Tratamento de entrada/saída HTTP e validação básica das requisições de documentos.
const fs = require('fs');
const documentService = require('../services/documents.service');

function toResponseBody(document) {
  const { id, originalName, size, uploadedAt, owner } = document;
  return { id, originalName, size, uploadedAt, owner };
}

function upload(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
  }
  if (!req.body.owner) {
    return res.status(400).json({ error: 'O campo owner é obrigatório' });
  }

  const document = documentService.registerUpload(req.file, req.body.owner);
  res.status(201).json(toResponseBody(document));
}

function list(req, res) {
  const documents = documentService.listDocuments().map(toResponseBody);
  res.json(documents);
}

function download(req, res) {
  const result = documentService.getDocumentForDownload(req.params.id);
  if (!result || !fs.existsSync(result.filePath)) {
    return res.status(404).json({ error: 'Documento não encontrado' });
  }

  const { document, filePath } = result;
  res.download(filePath, document.originalName, (err) => {
    if (err && !res.headersSent) {
      res.status(500).json({ error: 'Falha ao baixar o documento' });
    }
  });
}

module.exports = { upload, list, download };
