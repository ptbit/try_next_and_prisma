"use client";

import OneTool from "./OneTool";
import { ToolsService } from "@app/service/tools.service";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { DeleteToolModal } from "./DeleteToolModal";
import Image from "next/image";
import { AddToolModal } from "./AddToolModal";
import { EditToolModal } from "./EditToolModal";

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
  const [render, setRender] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteToolId, setDeleteToolId] = useState(0);
  const [editTool, setEditTool] = useState({});

  useEffect(() => {
    getAllTools();
  }, [render]);

  const getAllTools = async () => {
    const allTools = await ToolsService.getTools();
    setTools(allTools);
  };

  const onAddToolBtnHandler = async (
    toolImageUrl: string,
    toolTitle: string,
    toolDescription: string,
    toolTypesIds: number[]
  ) => {
    const res = await ToolsService.addTool(
      toolImageUrl,
      toolTitle,
      toolDescription,
      toolTypesIds
    );
    if (res === "OK") {
      setRender(!render);
    }
  };

  const onDeleteToolBtnHandler = async (id: number) => {
    await ToolsService.deleteTool(id);
    setRender(!render);
  };

  const onEditToolBtnHandler = async (
    id: number,
    toolImageUrl: string,
    toolTitle: string,
    toolDescription: string,
    connectArrIds: any,
    disconnectArrIds: any
  ) => {
    const res = await ToolsService.editTool(
      id,
      toolImageUrl,
      toolTitle,
      toolDescription,
      connectArrIds,
      disconnectArrIds
    );
    if (res === "OK") {
      setRender(!render);
    }
  };

  return (
    <>
      {tools.length > 0 ? (
        <div className="container">
          <div className="flex relative w-full m-2 p-1 border justify-center">
            <h1 className="text-2xl uppercase">TOOLS page</h1>
            <Image
              src={"/add-btn.svg"}
              className="cursor-pointer absolute right-1 hover:bg-yellow-100  rounded"
              width={35}
              height={35}
              alt={"add btn"}
              onClick={() => {
                setShowAddModal(true);
              }}
            ></Image>
          </div>

          <Modal
            open={showEditModal}
            onClose={() => {
              setShowEditModal(false);
            }}
          >
            <EditToolModal
              setShowEditModal={setShowEditModal}
              onEditToolBtnHandler={onEditToolBtnHandler}
              editTool={editTool}
            />
          </Modal>

          <Modal
            open={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
            }}
          >
            <DeleteToolModal
              setShowDeleteModal={setShowDeleteModal}
              deletedToolId={deleteToolId}
              onDeleteToolBtnHandler={onDeleteToolBtnHandler}
            />
          </Modal>

          <Modal
            open={showAddModal}
            onClose={() => {
              setShowAddModal(false);
            }}
          >
            <AddToolModal
              setShowAddModal={setShowAddModal}
              onAddToolBtnHandler={onAddToolBtnHandler}
            />
          </Modal>

          {tools.map((tool: ToolType) => {
            return (
              <ul key={tool.id} className="m-2 border p-1 w-full">
                <OneTool
                  tool={tool}
                  setRender={setRender}
                  render={render}
                  setDeleteToolId={setDeleteToolId}
                  setShowEditModal={setShowEditModal}
                  setShowDeleteModal={setShowDeleteModal}
                  setEditTool={setEditTool}
                />
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
