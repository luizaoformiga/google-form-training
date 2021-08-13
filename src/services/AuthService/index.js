import axios from "axios";
import * as jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";

const API_URL = "http://localhost:5000/api/user/";
//const API_URL = "http://192.168.225.23:5000/api/user/"

const isAuthenticated = () => {
  const token = localStorage.getItem("userTicket");

  if (token) {
    return true;
  } else {
    return false;
  }
};

const getGuestUser = () => {
  return { name: "Guest 123", userId: "guest123", email: "coolboy69@gg.com" };
};

const authenticate = (cb) => {
  //isAuthenticated = true;
  setTimeout(cb, 100); // fake async
};

const signout = (cb) => {
  //this.isAuthenticated = false;
  setTimeout(cb, 100);
};

const loginWithGoogle = async (res) => {
  const data = {
    name: res.profileObj.name,
    email: res.profileObj.email,
    image: res.profileObj.imageUrl,
  };

  const response = await axios.post(API_URL + "login", data);
  console.log(response.data);
  if (response.data.accessToken) {
    localStorage.setItem(
      "userTicket",
      JSON.stringify(response.data.accessToken)
    );
  }
  return response.data;
};

const loginAsGuest = () => {
  const userData = {
    name: "Cool Guest",
    id: "y2jsdqakq9rqyvtd4gf6g",
    email: "coolboy69@gg.com",
  };

  const accessToken = jwt.sign(
    userData,
    "thisisaguesttokenwithsomeshittystring8",
    { expiresIn: "24h" }
  );

  localStorage.setItem("userTicket", JSON.stringify(accessToken));
  return accessToken;
};

const logout = () => {
  localStorage.removeItem("userTicket");
};

const getCurrentUser = () => {
  return jwt_decode.InvalidTokenError(localStorage.getItem("userTicket"));
};

const AuthService = {
  authenticate,
  getCurrentUser,
  logout,
  getGuestUser,
  loginAsGuest,
  loginWithGoogle,
  signout,
  isAuthenticated,
};

export default AuthService;
