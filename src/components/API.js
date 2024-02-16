import axios from "axios";

axios.defaults.baseURL = "";

const getAPI = async (q) => {
  const { data } = await axios(
    `https://pixabay.com/api/?q=${q}&page=1&key=34132594-481e9c19a77d6b17ce2c74b04&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
};

export default getAPI;
