import axios from "axios";

const BASEURL = "http://localhost:3000/api";

export const ToolsService = {
  async getTypes() {
    const { data } = await axios.get(BASEURL + "/types");
    if (data.message === "OK") {
      return data.types;
    }
  },
  async getTools() {
    const { data } = await axios.get(BASEURL + "/tools");
    if (data.message === "OK") {
      return data.tools;
    }
  },

  async addTool(
    toolImageUrl: string,
    toolTitle: string,
    toolDescription: string,
    toolTypesIds: number[]
  ) {
    const { data } = await axios.post(BASEURL + `/tools`, {
      title: toolTitle,
      description: toolDescription,
      image: toolImageUrl,
      types: toolTypesIds,
    });

    return data.message;
  },

  async addToolType(id: number, newTypeId: number) {
    console.log("need add type for tool", id, "NEW TYPE ID", newTypeId);
    await axios.post(BASEURL + `/tools/${id}`, {
      newTypeId,
    });
  },

  async deleteTool(id: number) {
    await axios.delete(BASEURL + `/tools/${id}`);
  },

  async editTool(
    id: number,
    toolImageUrl: string,
    toolTitle: string,
    toolDescription: string,
    connectArrIds: any,
    disconnectArrIds: any
  ) {
    const { data } = await axios.put(BASEURL + `/tools/${id}`, {
      title: toolTitle,
      description: toolDescription,
      image: toolImageUrl,
      connectArrIds,
      disconnectArrIds,
    });

    return data.message;
  },
};
