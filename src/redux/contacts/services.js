import { instance } from "../auth/services";

const normalizeData = (data) => {
  if (data instanceof FormData) {
    return Object.fromEntries(data.entries());
  }
  return data;
};

export const requestGetContacts = async () => {
  const { data } = await instance.get("/contacts");
  return data;
};

export const requestAddContact = async (formData) => {
  const normalized = normalizeData(formData);
  const { data } = await instance.post("/contacts", normalized);
  return data;
};

export const requestDeleteContact = async (contactId) => {
  const { data } = await instance.delete(`/contacts/${contactId}`);
  return data;
};