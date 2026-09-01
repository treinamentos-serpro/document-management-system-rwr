export default function AlertMessage({ children }) {
  return (
    <p
      role="alert"
      className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
    >
      {children}
    </p>
  );
}
