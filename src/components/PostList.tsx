"use client";

import { PostsService } from "@app/service/posts.service";
import { useEffect, useState } from "react";

type PostType = {
  id: number;
  title: string;
  content: string;
  authorId: number;
};

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const allPosts = await PostsService.getPosts();
    setPosts(allPosts);
  };
  console.log("posts", posts);

  //   <div className="container">
  //     {posts.length > 0 ?

  //  : <>No posts</>}</div>;

  return (
    <>
      {posts.length > 0 ? (
        <div className="container">
          {posts.map((post: PostType) => {
            return (
              <div key={post.id}>
                <span>{post.id}</span>
                <span>{post.title}</span>
                <span>{post.content}</span>
                <span>{post.authorId}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <>No posts</>
      )}
    </>
  );
};

export default PostList;
