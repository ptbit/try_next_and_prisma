"use client";
type EditUserModalProps = {
  editUserId: number;
  editUserName: string;
  editUserEmail: string;
  setEditUserName: any;
  setEditUserEmail: any;
  onEditUserBtnHandler: any;
  setShowEditModal: any;
};

export const EditUserModal = ({
  editUserId,
  editUserName,
  editUserEmail,
  setEditUserName,
  setEditUserEmail,
  onEditUserBtnHandler,
  setShowEditModal,
}: EditUserModalProps) => {
  return (
    <div className="text-center w-full ">
      <h3 className="text-lg font-black text-gray-800 mb-5">Edit User: {editUserId}</h3>
      <div className="flex gap-2 justify-center w-full">
        <span className="border p-2 mb-2 w-1/3">User name: </span>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          placeholder="new user name"
          value={editUserName}
          onChange={(e) => setEditUserName(e.target.value)}
        />
      </div>
      <div className="flex gap-2 justify-center">
        <span className="border p-2 mb-2 w-1/3">User email: </span>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          placeholder="new user email"
          value={editUserEmail}
          onChange={(e) => setEditUserEmail(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <button
          className="font-bold text-gray-500 py-2 px-4 rounded shadow w-full hover:shadow-lg"
          onClick={() => {
            setShowEditModal(false);
          }}>
          Cancel
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full shadow"
          onClick={() => {
            onEditUserBtnHandler(editUserId);
            setShowEditModal(false);
          }}>
          Edit
        </button>
      </div>
    </div>
  );
};
