import { ReactNode, useEffect } from "react";
import { closeIcon } from "../../assets";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function ConfirmModal({ open, onClose, children }: ConfirmModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-20 flex justify-center items-center cursor-default transition-all ${
        open ? "visible bg-black/20 " : "invisible"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Modal container */}
      <div
        className={`relative bg-white rounded-lg overflow-auto w-[343px] my-8 p-6 text-neutral-900 transition-all duration-300 ease-in-out mx-4 md:mx-[107px] will-change-scale will-change-opacity ${
          open ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        {/* Close button */}
        <button className="absolute top-6 right-8" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
