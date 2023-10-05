type ModalPropsType = {
  open: boolean;
  onClose: any;
  children: any;
};

export const Modal = ({ open, onClose, children }: ModalPropsType) => {
  return (
    //backdrop
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-10 ${
        open ? "visible bg-black/30" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`w-1/2 bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          className="cursor-pointer absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray/50 hover:text-gray-500"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};
