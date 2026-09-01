const { test } = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

// Teste de fumaça do seed: garante que o app Express foi exportado.
test('o app backend é exportado', () => {
  assert.ok(app, 'o app deve estar definido');
  assert.strictEqual(typeof app, 'function', 'o app Express deve ser uma função');
});

async function withServer(run) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

function buildUploadForm({ owner = 'maria', filename = 'documento.txt', type = 'text/plain', content = 'conteúdo', includeOwner = true } = {}) {
  const formData = new FormData();
  if (includeOwner) {
    formData.append('owner', owner);
  }
  formData.append('file', new Blob([content], { type }), filename);
  return formData;
}

test('POST /upload retorna 201 e os metadados do documento', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/upload`, { method: 'POST', body: buildUploadForm() });
    const body = await response.json();

    assert.strictEqual(response.status, 201);
    assert.ok(body.id);
    assert.strictEqual(body.originalName, 'documento.txt');
    assert.strictEqual(body.owner, 'maria');
  });
});

test('POST /upload retorna 400 quando nenhum arquivo é enviado', async () => {
  await withServer(async (baseUrl) => {
    const formData = new FormData();
    formData.append('owner', 'maria');

    const response = await fetch(`${baseUrl}/upload`, { method: 'POST', body: formData });
    const body = await response.json();

    assert.strictEqual(response.status, 400);
    assert.match(body.error, /arquivo/i);
  });
});

test('POST /upload retorna 400 quando o owner não é informado', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: buildUploadForm({ includeOwner: false }),
    });
    const body = await response.json();

    assert.strictEqual(response.status, 400);
    assert.match(body.error, /owner/i);
  });
});

test('POST /upload rejeita tipos de arquivo não permitidos', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: buildUploadForm({ filename: 'script.exe', type: 'application/x-msdownload' }),
    });
    const body = await response.json();

    assert.strictEqual(response.status, 400);
    assert.match(body.error, /não permitido/i);
  });
});

test('GET /documents lista os documentos enviados', async () => {
  await withServer(async (baseUrl) => {
    await fetch(`${baseUrl}/upload`, { method: 'POST', body: buildUploadForm({ filename: 'lista.txt' }) });

    const response = await fetch(`${baseUrl}/documents`);
    const body = await response.json();

    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(body));
    assert.ok(body.some((document) => document.originalName === 'lista.txt'));
  });
});

test('GET /documents/:id/download retorna o arquivo enviado', async () => {
  await withServer(async (baseUrl) => {
    const uploadResponse = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: buildUploadForm({ filename: 'download.txt', content: 'olá mundo' }),
    });
    const { id } = await uploadResponse.json();

    const downloadResponse = await fetch(`${baseUrl}/documents/${id}/download`);
    const text = await downloadResponse.text();

    assert.strictEqual(downloadResponse.status, 200);
    assert.strictEqual(text, 'olá mundo');
  });
});

test('GET /documents/:id/download retorna 404 para id inexistente', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/documents/id-inexistente/download`);
    const body = await response.json();

    assert.strictEqual(response.status, 404);
    assert.match(body.error, /não encontrado/i);
  });
});
