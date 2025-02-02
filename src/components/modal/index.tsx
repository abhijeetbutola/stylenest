import { ReactNode } from "react";
import { useEffect } from "react";
import closeIcon from "../../assets/closeicon.svg"

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    loading?: boolean;
    error?: string | null;
}

function Modal({ open, onClose, children, loading, error }: ModalProps) {
    
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if(loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <div className={`fixed inset-0 z-20 flex justify-center items-center cursor-default ${open ? "visible bg-black/20 " : "invisible"}`}
         onClick={
            (e) => {
                e.stopPropagation()
                onClose()
                }
            }>
            
            {/* modal div */}
            <div className={`relative flex flex-col items-center bg-white rounded-lg
             min-h-[608px] w-[1008px] my-8 pt-[72px] text-neutral-900 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
             onClick={(e) => e.stopPropagation()}>
                {children}

                {/* modal close button */}
                <div className="absolute top-6 right-8">
                    <img src={closeIcon} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Modal