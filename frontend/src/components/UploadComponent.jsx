import { useState } from 'react';
import { uploadDocument } from '../services/documentApi';
import AlertMessage from './AlertMessage';

export default function UploadComponent({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file || !owner) {
      setError('Selecione um arquivo e informe o dono do documento');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const document = await uploadDocument(file, owner);
      setFile(null);
      setOwner('');
      event.target.reset();
      onUploaded(document);
    } catch (err) {
      setError(`Erro ao enviar documento: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border-t-4 border-indigo-500 bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-xl font-semibold text-indigo-900">Enviar documento</h2>
      <div className="mb-4">
        <label htmlFor="owner" className="mb-1 block text-sm font-medium text-slate-700">
          Dono do documento
        </label>
        <input
          id="owner"
          type="text"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="file" className="mb-1 block text-sm font-medium text-slate-700">
          Arquivo
        </label>
        <input
          id="file"
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
          className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        />
      </div>
      {error && (
        <div className="mb-4">
          <AlertMessage>{error}</AlertMessage>
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:from-slate-300 disabled:to-slate-300"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
