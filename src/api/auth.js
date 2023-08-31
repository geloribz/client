import axios from "axios";
//will send cookies back to server and we can check the token in the backend
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    "http://localhost:8000/api/register",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:8000/api/login", loginData);
}

export async function onLogout() {
  return await axios.get("http://localhost:8000/api/logout");
}

//fetch the protected info in the dashboard page. protected by userAuthRoute
//if this fails, then protected info is not shown and the user is forced logout
export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:8000/api/protected");
}
