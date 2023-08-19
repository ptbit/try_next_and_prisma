type UserPageParams = {
  params: {
    id: number;
  };
};
// ONE USER PAGE
const page = ({ params: { id } }: UserPageParams) => {
  return (
    <div className="container text-center">
      <h2 className="text-3xl font-bold">User page {id}</h2>
    </div>
  );
};
export default page;
