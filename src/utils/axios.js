import axios from "axios";

const axiosIns = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
// axiosIns.interceptors.request.use(
//   (response) => {
//     return response;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosIns;
