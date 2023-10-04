type DeleteToolModalProps = {
  setShowDeleteModal: any;
  deletedToolId?: number;
  onDeleteToolBtnHandler: any;
};

export const DeleteToolModal = ({
  setShowDeleteModal,
  deletedToolId,
  onDeleteToolBtnHandler,
}: DeleteToolModalProps) => {
  return (
    <div className="text-center w-full">
      <div className="mx-auto my-4 w-48">
        <h3 className="text-lg font-black text-gray-800 mb-5">
          Confirm Delete
        </h3>
        <p className="text-sm text-gray-500">
          Are you sure want to delete tool with id: {deletedToolId}?
        </p>
      </div>
      <div className="flex gap-4">
        <button
          className="font-bold text-gray-500 py-2 px-4 rounded shadow w-full hover:shadow-lg"
          onClick={() => {
            setShowDeleteModal(false);
          }}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full shadow"
          onClick={() => {
            onDeleteToolBtnHandler(deletedToolId);
            setShowDeleteModal(false);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
