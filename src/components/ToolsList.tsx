"use client";

import OneTool from "./OneTool";
import { ToolsService } from "@app/service/tools.service";
import { useEffect, useState } from "react";

type ToolType = {
  id: number;
  title: string;
  model: string;
  origin: string;
  image: string;
  description: ToolDescription[];
};

type ToolDescription = {
  name: string;
  value: string;
};

const ToolsList = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    getAllTools();
  }, []);

  const getAllTools = async () => {
    const allTools = await ToolsService.getTools();
    console.log("allTools", allTools);
    setTools(allTools);
  };

  //   <div className="container">
  //     {posts.length > 0 ?

  //  : <>No posts</>}</div>;

  return (
    <>
      {tools.length > 0 ? (
        <div className="container">
          {tools.map((tool: ToolType) => {
            return (
              <ul key={tool.id} className="m-2 border p-1">
                <OneTool tool={tool} />
              </ul>
            );
          })}
        </div>
      ) : (
        <>No tools</>
      )}
    </>
  );
};

export default ToolsList;
