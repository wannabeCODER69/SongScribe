import axiosClient from "./axiosClient";

export const uploadAudioFile = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosClient.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
};

export const getTranscriptionStatus = (transcriptionId) =>
  axiosClient.get(`/transcriptions/${transcriptionId}/status`);

export const getTranscriptionResult = (transcriptionId) =>
  axiosClient.get(`/transcriptions/${transcriptionId}`);

export const downloadTranscript = (transcriptionId, format) =>
  axiosClient.get(`/transcriptions/${transcriptionId}/download`, {
    params: { format }, // 'srt' | 'txt' | 'vtt'
    responseType: "blob",
  });

export const getHistory = () => axiosClient.get("/transcriptions");

export const getSaved = () => axiosClient.get("/transcriptions/saved");
