
import { ChangeEvent } from 'react';

export default function UploadPDF({ onUpload }: { onUpload: (file: File) => void }) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    } else {
      alert('Por favor selecciona un archivo PDF válido.');
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-400 p-10 rounded-lg text-center">
      <p className="mb-4 text-gray-600">Sube un archivo PDF para comenzar</p>
      <input type="file" accept="application/pdf" onChange={handleChange} />
    </div>
  );
}