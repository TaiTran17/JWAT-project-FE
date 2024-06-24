import RegisterForm from "@/pages/components/RegisterForm";
import React, { useRef, useState } from "react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center w-auto ">
        <div className="relative   p-4 rounded  w-fit">
          {/* Modal header */}
          <div className="flex justify-between items-center bg-indigo-500 text-white px-4 py-2 rounded-t-lg">
            <div></div>
            <h2 className="text-2xl font-semibold font-serif ">Sign up User</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <RegisterForm onClose={onClose} />
        </div>
      </div>
    </>
  );
};

export default Modal;
