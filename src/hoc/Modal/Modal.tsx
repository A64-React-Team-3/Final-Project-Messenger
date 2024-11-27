import React from "react";
import { useEffect } from "react";

type ModalProps = {
  modalRef: React.RefObject<HTMLDialogElement>;
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Modal: React.FC<ModalProps> = ({ modalRef, children, isModalOpen, setIsModalOpen }) => {
  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isModalOpen]);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box bg-base-300">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={() => setIsModalOpen((prevValue) => !prevValue)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
        </form>
        <div className="text-black">
          {children}
        </div>
      </div>
    </dialog>
  )
}

export default Modal;