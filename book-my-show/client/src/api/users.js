// const { axiosInstance } = require("./index");
import { axiosInstance } from "./index";

// Register new user

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/register", value);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const LoginUser = async (values) => {
  try {
    const response = await axiosInstance.post("/api/users/login", values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
