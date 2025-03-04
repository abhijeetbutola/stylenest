import { User } from "firebase/auth";

export const saveAuthToLocalStorage = (
  authData:
    | {
        id: string;
        email: string;
        name: string;
      }
    | User
) => {
  try {
    const serializedData = JSON.stringify(authData);
    localStorage.setItem("authData", serializedData);
  } catch (error) {
    console.error("Could not save auth data", error);
  }
};

export const loadAuthFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem("authData");
    if (!serializedData) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Could not load auth data", error);
    return null;
  }
};

export const clearAuthFromLocalStorage = () => {
  try {
    localStorage.removeItem("authData");
  } catch (error) {
    console.error("Could not clear auth data", error);
  }
};
