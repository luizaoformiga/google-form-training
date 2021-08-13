import axios from "axios";
const API_URL = "http://localhost:5000/api/form/";

const getForms = async (userId) => {
  const response = await axios.get(API_URL + "getuserforms/" + userId);
  return response.data;
};

const createForm = async (data) => {
  console.log(data);
  const response = await axios.post(API_URL + "create", data);
  console.log(response.data);
  return response.data;
};

const getForm = async (formId) => {
  const response = await axios.get(API_URL + "form/" + formId);
  return response.data;
};

const autoSave = async (data) => {
  console.log(data);
  const response = await axios.put(API_URL + "/editform/", data);
  console.log(response.data);
  return response.data;
};

const submitResponse = async (data) => {
  console.log(data);

  const response = await axios.post(API_URL + "addresponse", data);
  console.log(response.data);
  return response.data;
};

const getResponse = (formId) => {
  //  console.log(formId);
  return axios.get(API_URL + "getresponse/" + formId).then((response) => {
    // console.log(response.data);
    return response.data;
  });
};

const FormService = {
  autoSave,
  createForm,
  getForm,
  getResponse,
  submitResponse,
  getForms,
};

export default FormService;