import { getDownloadUrl } from '../services/documentApi';

export default function DownloadButton({ documentId, originalName }) {
  return (
    <a
      href={getDownloadUrl(documentId)}
      download={originalName}
      className="inline-flex items-center rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 shadow-sm hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
    >
      Baixar
    </a>
  );
}
