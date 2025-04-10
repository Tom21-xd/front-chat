export default function ChatHeader({ fileName, onReplace }: { fileName: string; onReplace: () => void }) {
    return (
      <div className="flex justify-between items-center w-full max-w-3xl mx-auto mb-4">
        <h2 className="font-semibold">📄 {fileName}</h2>
        <button onClick={onReplace} className="text-sm text-blue-600 underline">Cambiar PDF</button>
      </div>
    );
}  