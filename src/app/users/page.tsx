import { Users } from "@components/Users";

// USERS PAGE
const page = async () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl uppercase">users page</h1>

      <Users />
    </div>
  );
};
export default page;
