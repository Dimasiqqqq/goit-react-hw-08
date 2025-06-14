import axios from "axios";

export const instance = axios.create({
  baseURL: "https://connections-api.goit.global",
});

// Token utils
export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = "";
};

// Helper: always convert FormData to plain object if needed
const normalizeData = (data) => {
  if (data instanceof FormData) {
    return Object.fromEntries(data.entries());
  }
  return data;
};

// SignUp
export const requestSignUp = async (formData) => {
  const normalized = normalizeData(formData);
  const { data } = await instance.post("/users/signup", normalized);
  setToken(data.token);
  return data;
};

// SignIn
export const requestSignIn = async (formData) => {
  const normalized = normalizeData(formData);
  const { data } = await instance.post("/users/login", normalized);
  setToken(data.token);
  return data;
};

// Get current user
export const requestGetCurrentUser = async () => {
  const { data } = await instance.get("/users/current");
  return data;
};

// Logout
export const requestLogOut = async () => {
  const { data } = await instance.post("/users/logout");
  return data;
};