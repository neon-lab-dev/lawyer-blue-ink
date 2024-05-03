import axios from "axios";
import API from ".";
import { ITemplate } from "@/types/template.type";

export const handleUploadTemplate = async (data: {
  file_name: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file_name", data.file_name);
  formData.append("files", data.file);

  return new Promise((resolve, reject) => {
    axios
      .post(API.upload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.message ?? "Failed to upload file");
      });
  });
};

export const handleGetTemplates = async (): Promise<ITemplate[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.all, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data.pdfs);
      })
      .catch((err) => {
        reject(err.response.data.message ?? "Failed to fetch templates");
      });
  });
};

export const handleDeleteTemplate = async (id: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.pdf}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.message ?? "Failed to delete template");
      });
  });
};
