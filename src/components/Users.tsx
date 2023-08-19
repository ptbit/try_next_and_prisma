"use client";
import { UserService } from "@app/service/users.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AddUser } from "./AddUser";
import { DeleteModal } from "./DeleteModal";
import { EditUserModal } from "./EditUserModal";
import { Modal } from "./Modal";

type UserType = {
  id: number;
  name: string;
  email: string;
};

export const Users = () => {
  const [apiUsers, setApiUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedUserId, setDeletedUserId] = useState(0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState(0);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const users = await UserService.getUsers();
    setApiUsers(users);
  };

  const onDeleteUserBtnHandler = async (id: number) => {
    const res = await UserService.deleteUser({ id });
    if (res.ok) {
      getAllUsers();
    }
  };

  const onEditUserBtnHandler = async (id: number) => {
    const name = editUserName;
    const email = editUserEmail;
    const res = await UserService.editUser({ id, name, email });
    if (res.ok) {
      getAllUsers();
    }
  };

  return (
    <div className="container">
      <Modal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}>
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          deletedUserId={deletedUserId}
          onDeleteUserBtnHandler={onDeleteUserBtnHandler}
        />
      </Modal>

      <Modal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
        }}>
        {/* EDIT USER BLOCK START */}
        <EditUserModal
          editUserId={editUserId}
          editUserName={editUserName}
          editUserEmail={editUserEmail}
          setEditUserName={setEditUserName}
          setEditUserEmail={setEditUserEmail}
          onEditUserBtnHandler={onEditUserBtnHandler}
          setShowEditModal={setShowEditModal}
        />

        {/* EDIT USER BLOCK ENDS */}
      </Modal>

      <AddUser setApiUsers={setApiUsers} />

      <div className="flex flex-row w-full mb-1 gap-2">
        <div className="border px-3 w-1/3">Id</div>
        <div className="border px-3 w-1/3">Name</div>
        <div className="border px-3 w-1/3">Email</div>
        <button className="border px-3 text-transparent border-transparent cursor-default">
          edit
        </button>
        <button className="border px-3 text-transparent border-transparent cursor-default">
          del
        </button>
      </div>

      {apiUsers.length > 0 ? (
        apiUsers.map((user: UserType) => {
          return (
            <div className="flex flex-row w-full gap-2 mb-1 hover:bg-neutral-300" key={user.id}>
              <Link className="border px-3 w-1/3" href={`/users/${user.id}`}>
                <span>{user.id}</span>{" "}
              </Link>
              <Link className="border px-3 w-1/3" href={`/users/${user.id}`}>
                <span>{user.name}</span>
              </Link>
              <Link className="border px-3 w-1/3" href={`/users/${user.id}`}>
                <span>{user.email}</span>
              </Link>

              <button
                className="border px-3 bg-amber-100 hover:bg-amber-300"
                onClick={() => {
                  setEditUserId(user.id);
                  setEditUserName(user.name);
                  setEditUserEmail(user.email);
                  setShowEditModal(true);
                }}>
                edit
              </button>
              <button
                className="border px-3 bg-red-300 hover:bg-red-500"
                onClick={() => {
                  setShowDeleteModal(true);
                  setDeletedUserId(user.id);
                }}>
                del
              </button>
            </div>
          );
        })
      ) : (
        <h1>no users </h1>
      )}
    </div>
  );
};
