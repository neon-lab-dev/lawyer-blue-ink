import axios from "axios";
import API from ".";
import { IUser } from "@/types/user.type";

export const handleLogin = async (data: {
  email: string;
  password: string;
}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        API.login,
        { ...data },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        resolve(res.data?.user);
      })
      .catch((err) => {
        reject(err.response.data.message ?? "Something went wrong!");
      });
  });
};

export const handleGetMe = async (): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.me, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err.response.data.message ?? "Something went wrong!");
      });
  });
};

export const handleLogout = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.logout, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.message ?? "Something went wrong!");
      });
  });
};
