import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import AlertMessage from './components/AlertMessage';
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
      setError(`Erro ao carregar documentos: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-slate-100">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Document Management System
          </h1>
          <p className="mt-2 text-sm text-indigo-100">
            Envie, liste e baixe seus documentos com facilidade
          </p>
        </header>

        <UploadComponent onUploaded={loadDocuments} />

        {error && (
          <div className="mt-6">
            <AlertMessage>{error}</AlertMessage>
          </div>
        )}

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-indigo-900">Documentos enviados</h2>
          <DocumentList documents={documents} />
        </section>
      </main>
    </div>
  );
}
