import axios from "axios";
let constants = {
  apiUrl: "http://localhost:8800",
};

const axiosIns = axios.create({
  baseURL: constants.apiUrl,
});

const userServices = {
  async saveUser(payload) {
    console.log("eeeee",payload, axiosIns, axios);
    const res = await axios.post(`http://localhost:8800/api/user-signup`, {payload});
    console.log("dddd", res);
    return res;
  },

  async getUserById(userId) {
    const res = await axiosIns.get(`/api/fetchuserbyid/${userId}`);
    localStorage.setItem("user", res.data);
    return res;
  },
  async addTableData(data) {
    const res = await axiosIns.post(`/api/add-tabledata`, data);
    return res;
  },
  async updateTableData(data) {
    const res = await axiosIns.patch(`/api/update-tabledata/${data._id}`, data);
    return res;
  },
};

export default userServices;
