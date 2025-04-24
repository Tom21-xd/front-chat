export default function UploadPrompt({
  uploading,
  handleUpload,
}: {
  uploading: boolean;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <label
        htmlFor="pdf-upload"
        className="w-full border-2 border-dashed border-gray-300 p-10 rounded-lg text-center bg-gray-600 cursor-pointer hover:bg-gray-700 transition"
      >
        {uploading ? (
          <div className="flex flex-col items-center text-white space-y-2">
            <svg
              className="animate-spin h-6 w-6 text-white"
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
              />
            </svg>
            <p className="font-medium">Analizando PDF...</p>
          </div>
        ) : (
          <>
            <p className="mb-2 text-cyan-400 font-medium">
              Sube un archivo PDF para comenzar
            </p>
            <p className="text-white">Seleccionar archivo</p>
          </>
        )}
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}
