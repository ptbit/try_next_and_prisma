import ToolsList from "@components/ToolsList";
// TOOLS PAGE
const page = async () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl uppercase">TOOLS page</h1>
      <ToolsList/>
    </div>
  );
};
export default page;
