import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#154472] p-6 rounded-lg shadow-lg h-[470px] w-[1000px]">
        {children}
        <button
          onClick={onClose}
          className="mt-6 bg-white text-[#154472] w-[180px] ml-[370px] font-bold py-2 rounded-lg hover:bg-blue-200"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}
