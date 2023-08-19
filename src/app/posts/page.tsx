import PostList from "@components/PostList";

// POSTS PAGE
const page = () => {
  return (
    <div className="container text-center">
      <h1 className="text-2xl uppercase">posts page</h1>
      <PostList />
    </div>
  );
};
export default page;
