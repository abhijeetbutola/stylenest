import { ReactNode, useEffect } from "react";
import closeIcon from "../../assets/closeicon.svg";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    loading?: boolean;
    error?: string | null;
};

function Modal({ open, onClose, children, loading, error }: ModalProps) {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    console.log(open);
    

    return (
        <div className={`fixed inset-0 z-20 flex justify-center items-center cursor-default ${open ? "visible bg-black/20 " : "invisible"}`}
         onClick={
            (e) => {
                e.stopPropagation()
                onClose()
                }
            }>
            {/* Modal container */}
            <div
                className={`relative flex flex-col items-center bg-white rounded-lg min-h-[608px] w-[1008px] my-8 pt-[72px] text-neutral-900 transition-all duration-300 ease-out ${
                    open ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {loading ? "Loading..." : error ? `Error: ${error}` : children}

                {/* Close button */}
                <button className="absolute top-6 right-8" onClick={onClose}>
                    <img src={closeIcon} alt="Close" />
                </button>
            </div>
        </div>
    );
}

export default Modal;
