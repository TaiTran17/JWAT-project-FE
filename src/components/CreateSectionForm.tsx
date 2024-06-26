import { captionSchema } from "@/schema/blogInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const axios = require("axios");
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import SectionModal from "@/src/components/SectionModal";
import {
  deleteSectionAction,
  getSectionByBlogId,
} from "@/src/util/actions/sectionAction";
import { useMutation } from "@tanstack/react-query";
import { addSectionToBlog } from "@/src/util/actions/blogAction";

interface IProp {
  nextStep: () => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: FormData;
}
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const CreateBlogForm: React.FC<IProp> = ({
  nextStep,
  setFormData,
  formData,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sections, setSections] = useState<{ id: string; caption: string }[]>(
    []
  ); // State to manage sections
  const [selectedSection, setSelectedSection] = useState<{
    id: number;
    caption: string;
  } | null>(null); // State to manage selected section for modal

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(captionSchema),
  });

  const fetchSections = async () => {
    try {
      const result = await getSectionByBlogId(formData.id);
      if (result.success) {
        setSections(result.sections); // Assuming result.data contains the sections array
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: { caption: string; blog_id: string }) => {
      return addSectionToBlog(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteSectionAction(id);
    },
  });

  const addSectionBlog = async (data: { caption: string }) => {
    try {
      const result = await mutation.mutateAsync({
        caption: data.caption,
        blog_id: formData.id,
      });

      console.log("check", result);

      if (result.success) {
        toast.success(result.message);
        fetchSections();
      } else {
        toast.error(result.message);
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

  const deleteSection = async (sectionId: string) => {
    const result = await deleteMutation.mutateAsync(sectionId);
    if (result.success) {
      toast.success(result.message);
      fetchSections();
    } else {
      toast.error(result.message);
    }
  };

  const handleCancel = () => {
    router.push("/company");
  };

  const openModal = (section: { id: number; caption: string }) => {
    setSelectedSection(section);
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
        <div className="min-h-screen bg-gray-100 flex justify-center  px-20">
          <div className="space-y-10">
            <h1 className="text-center mt-10 text-4xl font-bold">
              Add sections
            </h1>

            <form
              onSubmit={handleSubmit(addSectionBlog)}
              className="w-82 md:w-auto"
            >
              <div
                id="section"
                className="flex items-center p-3 space-x-2 md:space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition text-sm  duration-500 md:p-6 md:text-xl md:max-w-fit "
              >
                <div className="flex bg-gray-100 p-3 w-60 space-x-4 rounded-lg md:p-4 md:w-auto">
                  <input
                    className="bg-gray-100 outline-none h-6 md:h-auto"
                    type="text"
                    placeholder="Article name or keyword..."
                    {...register("caption")}
                  />
                  {errors.caption && (
                    <span className="text-red-500">
                      {errors?.caption.message}
                    </span>
                  )}
                </div>

                <div className="bg-green-400 items-baseline text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex py-3 px-5 justify-center items-center h-fit"
                  >
                    {mutation.isPending ? "Submitting..." : "Add"}
                  </button>
                </div>
              </div>
            </form>

            {sections.length > 0 && (
              <h1 className="text-center mt-10 text-4xl font-bold">
                Section Added
              </h1>
            )}

            {sections?.map((section) => (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
              >
                <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                  <input
                    className="bg-gray-100 outline-none"
                    type="text"
                    value={section.caption}
                    readOnly
                  />
                </div>

                <div className="bg-green-400 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                  <button onClick={() => openModal(section)}>Add</button>
                </div>
                <div className="bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                  <button
                    onClick={() => deleteSection(section.id)}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
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
          Back to Homepage
        </button>
      </div>

      <SectionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        section={selectedSection}
      />
    </>
  );
};

export default CreateBlogForm;
