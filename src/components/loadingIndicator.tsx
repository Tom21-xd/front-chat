export default function LoadingIndicator({
  message = "Generando respuesta...",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <svg
        className="animate-spin h-5 w-5 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      {message}
    </div>
  );
}
