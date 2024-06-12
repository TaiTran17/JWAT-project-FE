import Modal from "@/pages/components/Modal";
import React, { useState } from "react";

export const LoginForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
        <div className="pb-2 pt-4">
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Username"
            className=" block w-full p-4 text-lg rounded-sm bg-black"
          />
        </div>
        <div className="pb-2 pt-4">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="block w-full p-4 text-lg rounded-sm bg-black"
          />
        </div>
        <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
          <a href="#" onClick={openModal}>
            Forgot your password
          </a>
        </div>
        <div className="px-4 pb-2 pt-4">
          <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
            Sign In
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
