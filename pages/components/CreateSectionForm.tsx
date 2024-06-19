import { captionSchema } from "@/schema/blogInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const axios = require("axios");
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import SectionModal from "@/pages/components/SectionModal";

interface IProp {
  nextStep: () => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: FormData;
}

const CreateBlogForm: React.FC<IProp> = ({
  nextStep,
  setFormData,
  formData,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sections, setSections] = useState<number[]>([]); // State to manage sections

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(captionSchema),
  });

  console.log("FormData", formData.id);

  const addSectionBlog = async (data: { caption: string }) => {
    try {
      const accessToken = Cookie.get("Authorization");
      console.log("Check data", data.caption);

      const response = await axios.post(
        "http://localhost:3000/section/create",
        {
          blog_id: formData.id,
          caption: data.caption,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // Changed to application/json
          },
        }
      );

      if (response.status === 201) {
        const newSectionId = response.data.id;
        setSections([...sections, newSectionId]);
        setValue("caption", ""); // Clear the input field
        toast.success("Section added successfully");
      } else {
        toast.error("Failed to add section");
      }
    } catch (error) {
      console.error("Error response:", error.response); // Log the error response
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Error adding section");
      }
    }
  };

  const handleCancel = () => {
    router.push("/Homepage");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addSection = () => {
    // Create a new section ID (you can adjust how you generate this ID)
    const newSectionId = sections.length + 1;
    setSections([...sections, newSectionId]);
  };

  //Delete section base on id
  const deleteSection = (sectionId: number) => {
    const updatedSections = sections.filter((id) => id !== sectionId);
    setSections(updatedSections);
  };

  return (
    <>
      <div>
        <div>Section Add</div>
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

              <form onSubmit={handleSubmit(addSectionBlog)}>
                <div
                  id="section"
                  className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
                >
                  <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                    <input
                      className="bg-gray-100 outline-none"
                      type="text"
                      placeholder="Article name or keyword..."
                      {...register("caption")}
                    />
                    {errors.caption && (
                      <span className="text-red-500">
                        {errors.caption.message}
                      </span>
                    )}
                  </div>

                  <div className="bg-green-400 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                    <button type="submit">Add</button>
                  </div>
                </div>
              </form>

              {sections.map((sectionId) => (
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
          <button
            className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            onClick={addSection}
            className="w-auto bg-green-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            More Sections
          </button>

          <button
            onClick={nextStep}
            className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            Create
          </button>
        </div>
      </div>

      <SectionModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CreateBlogForm;
