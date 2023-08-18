"use client";

import { UserService } from "@app/service/users.service";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setApiUsers: Dispatch<SetStateAction<never[]>>;
};
export const AddUser = ({ setApiUsers }: Props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const getAllUsers = async () => {
    const users = await UserService.getUsers();
    setApiUsers(users);
  };

  const onAddUser = async () => {
    const data = await UserService.addUser({ name: userName, email: userEmail });

    if (data.ok) {
      console.log("need show all use");
      getAllUsers();
    }
  };

  return (
    <div className="container mb-2 flex flex-row justify-between border pl-2">
      <span>AddUser:</span>
      <div className="flex gap-4">
        <input
          className="border pl-2"
          type="text"
          placeholder="User name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          className="border pl-2"
          type="text"
          placeholder="User email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <button
          className="border px-4 bg-green-300 cursor-pointer  hover:bg-green-600 hover:font-bold"
          style={{ minWidth: "130px" }}
          onClick={() => {
            onAddUser();
          }}>
          Add User
        </button>
      </div>
    </div>
  );
};
