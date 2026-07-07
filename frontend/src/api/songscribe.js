import api from "./axios";

/**
 * Upload an audio file
 */
export async function uploadAudio(file) {
    const formData = new FormData();

    // IMPORTANT:
    // Multer expects "file", not "audio"
    formData.append("file", file);

    const { data } = await api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
}

/**
 * Download transcript
 * type = "srt" | "txt" | "vtt"
 */
export async function downloadFile(jobId, type) {
    const response = await api.get(`/download/${type}/${jobId}`, {
        responseType: "blob",
    });

    return response.data;
}