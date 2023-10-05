import { ToolsService } from "@app/service/tools.service";
import { useEffect, useState } from "react";

type EditToolModalProps = {
  setShowEditModal: any;
  onEditToolBtnHandler: any;
  editTool: any;
};

type TypeType = {
  id: number;
  name: string;
};

export const EditToolModal = ({
  setShowEditModal,
  onEditToolBtnHandler,
  editTool,
}: EditToolModalProps) => {
  const [types, setTypes] = useState([]);
  const [toolImageUrl, setToolImageUrl] = useState("");
  const [toolTitle, setToolTitle] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const [toolTypesIds, setToolTypesIds] = useState<number[]>([]);

  useEffect(() => {
    getTypes();
    if (editTool.title) {
      setToolTitle(editTool.title);
      setToolImageUrl(editTool.image);
      setToolDescription(editTool.description);
      let editToolIds: number[] = [];
      editTool.type.forEach((type: any) => {
        editToolIds.push(type.id);
      });
      setToolTypesIds(editToolIds);
    }
  }, [editTool]);

  const getTypes = async () => {
    const allTypes = await ToolsService.getTypes();
    setTypes(allTypes);
  };

  type ConnectArrType = {
    id: number;
  };

  const generateConnectArr = (toolTypesIds: number[]) => {
    let res: ConnectArrType[] = [];
    toolTypesIds.forEach((typeId) => {
      res.push({ id: typeId });
    });
    return res;
  };

  const generateDisconnectArr = (toolTypesIds: number[]) => {
    let res: ConnectArrType[] = [];
    let allTypesIds: number[] = [];

    types.forEach((type: TypeType) => {
      allTypesIds.push(type.id);
    });

    allTypesIds.forEach((typeId) => {
      res.push({ id: typeId });
    });

    return res;
  };

  const fullClearModal = () => {
    setToolImageUrl("");
    setToolTitle("");
    setToolDescription("");
    setToolTypesIds([]);
    setShowEditModal(false);
  };

  return (
    <div className="text-center w-full">
      <div className="mx-auto my-4 w-full">
        <h3 className="text-lg font-black text-gray-800 mb-5">
          Edit Tool by id: {editTool.id}
        </h3>

        <p className="text-sm text-gray-500">
          Fill all field or click on mock data button
        </p>
        <div className="flex justify-between">
          <span className="w-1/4 my-1 px-2">Image URL:</span>
          <input
            className="border w-3/4 my-1 px-2"
            type="text"
            placeholder="image url"
            value={toolImageUrl}
            onChange={(e) => {
              setToolImageUrl(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-between">
          <span className="w-1/4 my-1 px-2">Tool title:</span>
          <input
            className="border w-3/4 my-1 px-2"
            type="text"
            placeholder="title"
            value={toolTitle}
            onChange={(e) => {
              setToolTitle(e.target.value);
            }}
          />{" "}
        </div>
        <div className="flex justify-between">
          <span className="w-1/4 my-1 px-2">Tool description:</span>
          <input
            className="border w-3/4 my-1 px-2"
            type="text"
            placeholder="description"
            value={toolDescription}
            onChange={(e) => {
              setToolDescription(e.target.value);
            }}
          />
        </div>
        <div className="w-32 m-auto">
          <p className="text-left">
            <b>Select types:</b>
          </p>
          {types.map((type: TypeType) => {
            return (
              <div className="flex " key={type.id}>
                <label className="cursor-pointer">
                  <input
                    className="mx-2 cursor-pointer"
                    type="checkbox"
                    checked={toolTypesIds.includes(type.id)}
                    id={type.name}
                    onChange={() => {
                      if (toolTypesIds.includes(type.id)) {
                        setToolTypesIds(
                          toolTypesIds.filter((e) => e !== type.id)
                        );
                      } else {
                        setToolTypesIds((prev) => [...prev, type.id]);
                      }
                    }}
                  />
                  {type.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {/* <button
        className="font-bold text-gray-500 py-2 px-4 rounded shadow w-full hover:shadow-lg my-2 hover:bg-orange-100 duration-300"
        onClick={() => {
          fillMockData();
        }}
      >
        test data
      </button> */}
      <div className="flex gap-4">
        <button
          className="font-bold text-gray-500 py-2 px-4 rounded shadow w-full hover:shadow-lg duration-300"
          onClick={() => {
            fullClearModal();
          }}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full shadow duration-300"
          onClick={() => {
            const disconnectArrIds = generateDisconnectArr(toolTypesIds);
            const connectArrIds = generateConnectArr(toolTypesIds);
            onEditToolBtnHandler(
              editTool.id,
              toolImageUrl,
              toolTitle,
              toolDescription,
              connectArrIds,
              disconnectArrIds
            );
            fullClearModal();
          }}
        >
          Edit Tool
        </button>
      </div>
    </div>
  );
};
