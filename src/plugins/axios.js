import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
  headers: {
    Accept: "application/json"
  }
});

// Alter defaults after instance has been created
const token = localStorage.getItem("user-token");

if (token) {
  instance.defaults.headers.common["Authorization"] = `JWT ${token}`;
}

export default instance;
