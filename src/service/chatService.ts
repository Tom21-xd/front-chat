const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://dvbc8l62-8000.use.devtunnels.ms";

export async function uploadPDF(file: File) {
    console.log("Uploading PDF to API:", file.name);
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload_pdf`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Error al subir PDF");
  }

  return await res.json();
}
export async function askQuestion(question: string) {
    const formData = new FormData();
    formData.append("question", question);
  
    const res = await fetch(`${API_URL}/ask`, {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Error al obtener respuesta");
    }
  
    const data = await res.json();
    return data.response;
  }
  
