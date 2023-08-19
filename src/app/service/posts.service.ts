import axios from "axios";
import {  NextResponse } from "next/server";

const BASEURL = "http://localhost:3000/api";

export const PostsService = {

  async getPosts() {
    const { data } = await axios.get(BASEURL + "/posts");
    return data.posts;
  }
}
