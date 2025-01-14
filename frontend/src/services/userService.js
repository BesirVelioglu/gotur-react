import axios from "axios";

export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const login = async (email, password) => {
  const { data } = await axios.post("api/users/login", { email, password });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const register = async (registerData) => {
  const { data } = await axios.post("api/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const updateProfile = async (profileData) => {
  try {
    const { data } = await axios.put("api/users/updateProfile", profileData, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    });
    localStorage.setItem("user", JSON.stringify(data)); // Güncellenmiş kullanıcıyı kaydet
    return data;
  } catch (err) {
    throw new Error(err.response?.data || "Failed to update profile");
  }
};

export const changePassword = async (passwords) => {
  try {
    const { data } = await axios.put("/api/users/changePassword", passwords, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err.response?.data || "Failed to change password");
  }
};
