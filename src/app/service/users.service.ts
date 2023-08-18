import axios from "axios";
import {  NextResponse } from "next/server";

const BASEURL = "http://localhost:3000/api";

type AddUserProps = {
  name: string;
  email: string;
};
type DeleteUserProps = {
  id: number;
};

type EditUserProps = {
  id: number;
  name: string;
  email: string;
};

export const UserService = {
  async getUsers() {
    const { data } = await axios.get(BASEURL + "/users");
    return data.prismaUsers;
  },

  async addUser({ name, email }: AddUserProps) {
    try {
      const newUser = await axios.post(BASEURL + "/users", {
        name,
        email,
      });
      console.log("newUser", newUser);
      return NextResponse.json(newUser);
    } catch (err) {
      return NextResponse.json({ message: "Add user error", err }, { status: 500 });
    }
  },

  async deleteUser({ id }: DeleteUserProps) {
    try {
      const resp = await axios.delete(BASEURL + `/users/${id}`, {});

      return NextResponse.json("del");
    } catch (err) {
      return NextResponse.json({ message: "Delete user error", err }, { status: 500 });
    }
  },

  async editUser({ id, name, email }: EditUserProps) {
    try {
      const resp = await axios.put(BASEURL + `/users/${id}`, {
        name,
        email,
      });

      return NextResponse.json("Edit");
    } catch (err) {
      return NextResponse.json({ message: "Delete user error", err }, { status: 500 });
    }
  },
};
