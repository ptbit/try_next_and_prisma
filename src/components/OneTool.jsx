"use client";

import { ToolsService } from "@app/service/tools.service";
import Image from "next/image";
import { useState, useEffect } from "react";

const OneTool = ({ tool }) => {
  const [toolTitle, setToolTitle] = useState("");
  useEffect(() => {
    setToolTitle(tool.title);
  }, []);

  const saveNewTitle = async () => {
    console.log("need save new title", toolTitle);
    await ToolsService.addTool();
  };

  return (
    <>
      <div className="flex gap-2">
        <Image src={tool.image} alt="tool image" width={150} height={150} />
        <ul>
          <li>
            tool.id: <b>{tool.id}</b>
          </li>
          <li>
            tool.title: <b>{toolTitle}</b>
            <button className="border p-1 px-3 ml-2">edit</button>
            <div className="flex mt-2 w-full">
              <input
                className="border p-1 px-3 w-full"
                type="text"
                value={toolTitle}
                onChange={(e) => {
                  setToolTitle(e.target.value);
                }}
              />
              <button
                className="border p-1 px-3 ml-2 hover:bg-green-200"
                onClick={saveNewTitle}
              >
                save
              </button>
            </div>
          </li>
          <li>
            tool.model: <b>{tool.model}</b>
          </li>
          <li>
            tool.origin: <b>{tool.origin}</b>
          </li>
        </ul>
      </div>
      <h3>tool desc:</h3>
      {tool.description.map((desc, index) => {
        return (
          <div key={index}>
            <b>
              <li>{desc.name}</li>
            </b>
            <li className="mx-10">{desc.value}</li>
          </div>
        );
      })}
    </>
  );
};

export default OneTool;
