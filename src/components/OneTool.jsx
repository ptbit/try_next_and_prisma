"use client";

import { ToolsService } from "@app/service/tools.service";
import Image from "next/image";
import { useState, useEffect } from "react";

const OneTool = ({
  tool,
  setRender,
  render,
  setShowDeleteModal,
  setDeleteToolId,
}) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    const allTypes = await ToolsService.getTypes();
    setTypes(allTypes);
  };

  const addType = async (id, newTypeId) => {
    await ToolsService.addToolType(id, newTypeId);
    setRender(!render);
  };

  const toolTypeIds = [];

  tool.type.forEach((type) => {
    toolTypeIds.push(type.id);
  });

  let imageUrl = "/no-img.svg";
  if (tool.image.startsWith("http://") || tool.image.startsWith("https://")) {
    imageUrl = tool.image;
  }
  
  return (
    <>
      <div className="flex gap-2">
        <Image src={imageUrl} alt="tool image" width={150} height={150} />
        <ul className="relative w-full">
          <li>
            <div>
              Tool title: <b>{tool.title}</b>
            </div>
          </li>
          <li>
            <h3>Description:</h3>
            {tool.description}
          </li>
          <li className="flex">
            <h3>All types:</h3>

            {types.map((type) => {
              return (
                <div key={type.id}>
                  {toolTypeIds.includes(type.id) ? (
                    <div
                      className="mx-1 border px-2 bg-green-200 cursor-pointer"
                      key={type.id}
                      onClick={() => {
                        addType(tool.id, type.id);
                      }}
                    >
                      <b>{type.name}</b>
                    </div>
                  ) : (
                    <div
                      className="mx-1 border px-2 cursor-pointer"
                      key={type.id}
                      onClick={() => {
                        addType(tool.id, type.id);
                      }}
                    >
                      {type.name}
                    </div>
                  )}
                </div>
              );
            })}
          </li>
          <li className="absolute top-0 right-0">
            <Image
              src={"/edit-btn.svg"}
              className="cursor-pointer inline hover:bg-green-200 ml-2 p-2 rounded"
              width={35}
              height={35}
              alt={"edit btn"}
              onClick={() => {
                console.log("need edit tool", tool.id);
              }}
            ></Image>

            <Image
              src={"/delete-btn.svg"}
              className="cursor-pointer inline hover:bg-red-200 ml-2 p-2 rounded"
              width={35}
              height={35}
              alt={"dell btn"}
              onClick={() => {
                setDeleteToolId(tool.id);
                setShowDeleteModal(true);
              }}
            ></Image>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OneTool;
