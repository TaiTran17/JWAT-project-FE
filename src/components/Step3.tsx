import React, { useState } from "react";

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  prevStep: () => void;
  submitForm: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const Step3: React.FC<StepProps> = ({
  formData,
  setFormData,
  prevStep,
  submitForm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 mt-5 mx-7">
        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
          Title's event
        </label>
        <input
          id="title"
          className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          placeholder="Title"
          value={formData?.title}
          disabled={true}
        />
      </div>

      <div className="grid grid-cols-1 mt-5 mx-7">
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-20">
          <div className="space-y-10">
            <h1 className="text-center mt-10 text-4xl font-bold">
              Add sections
            </h1>
            <div
              id="section"
              className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
            >
              <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  className="bg-gray-100 outline-none"
                  type="text"
                  placeholder="Article name or keyword..."
                />
              </div>

              <div className="bg-green-400 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                <button onClick={openModal}>Add</button>
              </div>
            </div>

            {/* {sections.map((sectionId) => (
              <div
                key={sectionId}
                id={`section-${sectionId}`}
                className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
              >
                <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 opacity-30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                     strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    className="bg-gray-100 outline-none"
                    type="text"
                    placeholder="Article name or keyword..."
                  />
                </div>

                <div className="bg-green-400 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                  <button onClick={openModal}>Add</button>
                </div>
                <div className="bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                  <button onClick={() => deleteSection(sectionId)}>
                    Delelte
                  </button>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
