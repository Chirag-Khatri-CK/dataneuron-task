import axios from "axios";
let constants = {
  apiUrl: "https://dataneuron-api-task.vercel.app/",
};

const axiosIns = axios.create({
  baseURL: constants.apiUrl,
});

const userServices = {
  async saveUser(payload) {
    const res = await axiosIns.post(`/api/user`, payload);
    return res;
  },

  async getUserById(userId) {
    const res = await axiosIns.get(`/api/user/${userId}`);
    localStorage.setItem("user", res.data);
    return res;
  },
  async addTableData(data) {
    const res = await axiosIns.post(`/api/tabledata`, data);
    return res;
  },
  async updateTableData(data) {
    const res = await axiosIns.patch(`/api/tabledata/${data._id}`, data);
    return res;
  },
  async getTableDataByUserId(userId) {
    const res = await axiosIns.get(`/api/tabledata/${userId}`);
    return res;
  },
};

export default userServices;
