import { useState } from 'react';
import { uploadDocument } from '../services/documentApi';

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
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enviar documento</h2>
      <div>
        <label htmlFor="owner">Dono do documento</label>
        <input id="owner" type="text" value={owner} onChange={(event) => setOwner(event.target.value)} />
      </div>
      <div>
        <label htmlFor="file">Arquivo</label>
        <input id="file" type="file" onChange={(event) => setFile(event.target.files[0])} />
      </div>
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
