import { getDownloadUrl } from '../services/documentApi';

export default function DownloadButton({ documentId, originalName }) {
  return (
    <a href={getDownloadUrl(documentId)} download={originalName}>
      Baixar
    </a>
  );
}
