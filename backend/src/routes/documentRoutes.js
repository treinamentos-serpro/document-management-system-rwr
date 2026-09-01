const express = require('express');
const documentController = require('../controllers/documentController');
const fileStorage = require('../repositories/fileStorage');

const router = express.Router();

router.post('/upload', fileStorage.upload.single('file'), documentController.upload);
router.get('/documents', documentController.list);
router.get('/documents/:id/download', documentController.download);

module.exports = router;
