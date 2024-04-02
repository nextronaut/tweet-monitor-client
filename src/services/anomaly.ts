import axiosInstance from "./axiosInstance";

export const getAnomalies = () => {
  return axiosInstance.get("/anomalies");
};

export const getAnomaliesByPlatform = (platform: string) => {
  return axiosInstance.get(`/anomalies/platform/${platform}`);
};

export const getAnomaly = (id: string) => {
  return axiosInstance.get(`/anomalies/${id}`);
};
