import axios from "axios";

const uploadImage = async (data) => {
  const res = await axios.post("http://localhost:5000/", data, {});
  return res.data;
};

const UploadService = {
  uploadImage,
};

export default UploadService;
