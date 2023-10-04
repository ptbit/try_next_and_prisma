import { ToolsService } from "@app/service/tools.service";
import { useEffect, useState } from "react";

type AddToolModalProps = {
  setShowAddModal: any;
  onAddToolBtnHandler: any;
};

type TypeType = {
  id: number;
  name: string;
};

export const AddToolModal = ({
  setShowAddModal,
  onAddToolBtnHandler,
}: AddToolModalProps) => {
  const [types, setTypes] = useState([]);
  const [toolImageUrl, setToolImageUrl] = useState("");
  const [toolTitle, setToolTitle] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const [toolTypesIds, setToolTypesIds] = useState<number[]>([]);

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    const allTypes = await ToolsService.getTypes();
    setTypes(allTypes);
  };

  const fillMockData = () => {
    setToolImageUrl(
      "https://wiki.protospace.ca/images/thumb/2/23/107.jpg/160px-107.jpg"
    );
    setToolTitle("Laser cutter (Trotec Speedy 300)");
    setToolDescription(`Working bed size: 730mm x 430mm (28 3/4" x 17" ish)`);
    setToolTypesIds([2, 3]);
  };

  const fullClearModal = () => {
    setToolImageUrl("");
    setToolTitle("");
    setToolDescription("");
    setToolTypesIds([]);
    setShowAddModal(false);
  };

  return (
    <div className="text-center w-full">
      <div className="mx-auto my-4 w-full">
        <h3 className="text-lg font-black text-gray-800 mb-5">Add new Tool</h3>

        <p className="text-sm text-gray-500">
          Fill all field or click on mock data button
        </p>
        <input
          className="border w-full my-1 px-2"
          type="text"
          placeholder="image url"
          value={toolImageUrl}
          onChange={(e) => {
            setToolImageUrl(e.target.value);
          }}
        />
        <input
          className="border w-full my-1 px-2"
          type="text"
          placeholder="title"
          value={toolTitle}
          onChange={(e) => {
            setToolTitle(e.target.value);
          }}
        />
        <input
          className="border w-full my-1 px-2"
          type="text"
          placeholder="description"
          value={toolDescription}
          onChange={(e) => {
            setToolDescription(e.target.value);
          }}
        />
        <div>
          <p className="text-left">
            <b>Select types:</b>
          </p>
          {types.map((type: TypeType) => {
            return (
              <div className="flex" key={type.id}>
                <label className="cursor-pointer">
                  <input
                    className="mx-2 cursor-pointer"
                    type="checkbox"
                    name=""
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
      <button
        className="font-bold text-gray-500 py-2 px-4 rounded shadow w-full hover:shadow-lg my-2 hover:bg-orange-100 duration-300"
        onClick={() => {
          fillMockData();
        }}
      >
        test data
      </button>
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
            onAddToolBtnHandler(
              toolImageUrl,
              toolTitle,
              toolDescription,
              toolTypesIds
            );
            fullClearModal();
          }}
        >
          Add Tool
        </button>
      </div>
    </div>
  );
};
