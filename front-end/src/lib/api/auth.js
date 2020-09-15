import client from "./client";

//login
export const login = ({ username, password }) =>
  client.post("/api/auth/login", { username, password });

//SignUp
export const register = ({ username, password, nickname }) =>
  client.post("/api/auth/register", { username, password, nickname });

//Check user status
export const check = () => client.get("/api/auth/check");

//Logout
export const logout = () => client.post('/api/auth/logout')
