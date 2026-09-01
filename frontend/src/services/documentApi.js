// Cliente HTTP para a API do Document Management System (prefixo /api).
const API_PREFIX = '/api';

async function parseErrorMessage(response) {
  try {
    const data = await response.json();
    return data.error || 'Erro ao comunicar com o servidor';
  } catch {
    return 'Erro ao comunicar com o servidor';
  }
}

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('owner', owner);

  const response = await fetch(`${API_PREFIX}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}

export async function listDocuments() {
  const response = await fetch(`${API_PREFIX}/documents`);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}

export function getDownloadUrl(id) {
  return `${API_PREFIX}/documents/${id}/download`;
}
