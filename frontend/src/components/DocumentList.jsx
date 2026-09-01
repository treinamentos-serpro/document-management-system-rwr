import DownloadButton from './DownloadButton';

const COLUMN_HEADERS = ['Nome', 'Dono', 'Tamanho', 'Enviado em'];
const thClassName = 'px-4 py-3 text-left font-semibold text-indigo-50';

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${bytes} bytes`;
}

export default function DocumentList({ documents }) {
  if (documents.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-indigo-300 bg-indigo-50 px-4 py-8 text-center text-sm text-indigo-600">
        Nenhum documento enviado ainda.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-indigo-600">
          <tr>
            {COLUMN_HEADERS.map((header) => (
              <th key={header} scope="col" className={thClassName}>
                {header}
              </th>
            ))}
            <th scope="col" className={thClassName}>
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {documents.map((document) => (
            <tr key={document.id} className="odd:bg-white even:bg-indigo-50/40 hover:bg-indigo-50">
              <td className="px-4 py-3 font-medium text-slate-800">{document.originalName}</td>
              <td className="px-4 py-3 text-slate-600">{document.owner}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                  {formatSize(document.size)}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">
                {new Date(document.uploadedAt).toLocaleString('pt-BR')}
              </td>
              <td className="px-4 py-3">
                <DownloadButton documentId={document.id} originalName={document.originalName} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
