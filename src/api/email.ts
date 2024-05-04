import axios from "axios";
import API from ".";

export const handleSendEmail = async (data: {
  to: string;
  subject: string;
  cc: string;
  body: string;
  attachments: File[];
}) => {
  const formData = new FormData();
  formData.append("to", data.to);
  formData.append("subject", data.subject);
  formData.append("cc", data.cc);
  formData.append("body", data.body);
  data.attachments?.forEach((file) => {
    formData.append("files", file);
  });

  return new Promise((resolve, reject) => {
    axios
      .post(API.send, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.message ?? "Failed to send email");
      });
  });
};
