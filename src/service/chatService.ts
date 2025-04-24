const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://dvbc8l62-8085.use.devtunnels.ms";

async function handleJsonResponse(res: Response, defaultErrorMsg: string) {
  if (!res.ok) {
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      throw new Error(data?.detail || defaultErrorMsg);
    } catch {
      throw new Error(text || defaultErrorMsg);
    }
  }

  try {
    return await res.json();
  } catch {
    return {};
  }
}

async function safeReadText(res: Response) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export async function uploadPDF(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload_pdf`, {
    method: "POST",
    body: formData,
  });

  return handleJsonResponse(res, "Error al subir PDF");
}

export async function askQuestion(question: string) {
  const res = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const data = await handleJsonResponse(res, "Error al obtener respuesta");
  return data.response;
}

export async function askFromAudio(file: Blob) {
  const formData = new FormData();
  const audioFile = new File([file], "grabacion.wav", { type: "audio/wav" });
  formData.append("file", audioFile);
  console.log(
    "Audio generado:",
    audioFile.name,
    audioFile.type,
    audioFile.size
  );

  const res = await fetch(`${API_URL}/ask_audio`, {
    method: "POST",
    body: formData,
  });

  const data = await handleJsonResponse(res, "Error al procesar el audio");
  return data.response;
}

export async function speakText(response: string): Promise<Blob> {
  const res = await fetch(`${API_URL}/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ response }),
  });

  if (!res.ok) {
    const errorText = await safeReadText(res);
    throw new Error(errorText || "Error al convertir texto a voz");
  }

  return await res.blob();
}
