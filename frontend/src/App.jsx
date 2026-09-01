import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { listDocuments } from './services/documentApi';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  const loadDocuments = useCallback(async () => {
    try {
      const data = await listDocuments();
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Document Management System</h1>
      <UploadComponent onUploaded={loadDocuments} />
      {error && <p role="alert">{error}</p>}
      <h2>Documentos enviados</h2>
      <DocumentList documents={documents} />
    </main>
  );
}
