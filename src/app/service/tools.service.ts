import axios from "axios";

const BASEURL = "http://localhost:3000/api";

export const ToolsService = {
  async getTools() {
    const { data } = await axios.get(BASEURL + "/tools");
    if (data.message === "OK") {
      return data.tools;
    }
  },
  
  async addTool() {
    const  data = await axios.post(BASEURL + "/tools");
    console.log('POST DATA', data)
    // if (data.message === "OK") {
    //   return data.tools;
    // }
  },
};
