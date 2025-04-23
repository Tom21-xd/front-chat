const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://dvbc8l62-8085.use.devtunnels.ms";
console.log("API URL:", API_URL);

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
  
  export async function askFromAudio(file: Blob) {
    const formData = new FormData();
    const audioFile = new File([file], 'grabacion.wav', { type: 'audio/webm' });
  
    formData.append("file", audioFile); // este campo debe coincidir con lo que espera el backend
  
    const res = await fetch(`${API_URL}/ask_audio`, {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Error al procesar el audio");
    }
  
    const data = await res.json();
    return data.response;
  }
  