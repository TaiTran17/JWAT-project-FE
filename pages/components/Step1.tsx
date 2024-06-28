import CreateBlogForm from "@/pages/components/CreateBlogForm";
import React, { useRef, useState } from "react";

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  nextStep: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const Step1: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const handleSetFormData = (data: any) => {
    setFormData(data);
  };

  return (
    <>
      <div className="flex  w-full h-screen border-black items-center justify-center  mt-5 mb-32">
        <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-3/4">
          <div className="flex justify-center py-4">
            <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex">
              <h1 className=" uppercase text-gray-600 font-bold md:text-2xl text-xl">
                Create Blog
              </h1>
            </div>
          </div>

          <CreateBlogForm nextStep={nextStep} setFormData={handleSetFormData} />
        </div>
      </div>
    </>
  );
};

export default Step1;
