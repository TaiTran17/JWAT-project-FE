import { blogInfoSchema, mappedTypeBlogOptions } from "@/schema/blogInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const axios = require("axios");
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { createBlog } from "@/pages/actions/blogACtion";

interface IProp {
  nextStep: () => void;
}

const CreateBlogForm: React.FC<IProp> = ({ nextStep }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [topics, setTopics] = useState([]);

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedFile(null); // clear the selected file
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file); // store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click event
  };

  const handleCancel = () => {
    router.push("/Homepage");
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the endpoint
  const fetchData = async () => {
    const accessToken = Cookie.get("Authorization");
    try {
      const response = await axios.get("http://localhost:3000/topic", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  // Create topicOptions array
  const topicOptions = topics.map((topic: any) => (
    <option value={topic.topic_id} key={topic.topic_id}>
      {topic.topic_name}
    </option>
  ));

  const typeBlogOptions = Object.entries(mappedTypeBlogOptions).map(
    ([value, label]) => (
      <option value={value} key={value}>
        {label}
      </option>
    )
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<blogInputs>({
    defaultValues: {
      title: "",
      description: "",
      thumbnail: null,
      topic: "",
      type: "",
    },
    resolver: zodResolver(blogInfoSchema),
  });

  const onSubmit: SubmitHandler<blogInputs> = async (data) => {
    console.log("Form Data:", data); // Check if data contains expected values
    console.log("Selected File:", selectedFile); // Check if selectedFile is populated

    // Check if selectedFile is properly set before constructing formData
    if (!selectedFile) {
      console.error("No file selected!"); // Log an error if selectedFile is missing
      return; // Exit onSubmit function early if selectedFile is missing
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("topic", data.topic);
    formData.append("type", data.type);
    formData.append("thumbnail", selectedFile); // Append the File object itself

    const result = await createBlogAction(formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const createBlogAction = async (formData: FormData) => {
    try {
      console.log("data before call API", formData);
      const accessToken = Cookie.get("Authorization");
      const response = await fetch("http://localhost:3000/blog/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Error creating blog:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error creating blog",
      };
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mt-5 mx-7">
        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
          Title's event
        </label>
        <input
          id="title"
          className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          placeholder="Title"
          {...register("title")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
        <div className="grid grid-cols-1">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Topic
          </label>
          <select
            id="topic"
            className=" py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            {...register("topic")}
          >
            {topicOptions}
          </select>
        </div>
        <div className="grid grid-cols-1">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Event type
          </label>
          <select
            id="type"
            className=" py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            {...register("type")}
          >
            {typeBlogOptions}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-5 mx-7">
        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
          Description
        </label>
        <textarea
          id="description"
          className="h-32 py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Describe this event with your amazing words"
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-1 mt-5 mx-7">
        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
          Upload Photo
        </label>
        {selectedImage ? (
          <div className="flex items-center justify-center w-full mt-4 group">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-64 object-cover"
              onClick={handleImageClick}
            />
            <button
              onClick={handleClose}
              className="relative h-auto -top-32 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden w-full"
              {...register("thumbnail")}
              onChange={(e) => {
                handleImageUpload(e);
                setValue("thumbnail", e.target.files); // update avatar value
              }}
              accept="image/png, image/jpeg"
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col border-4 border-dashed w-full h-64 hover:bg-gray-100 hover:border-purple-300 justify-center group">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                    Select a photo
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  {...register("thumbnail")}
                  onChange={(e) => {
                    handleImageUpload(e);
                    setValue("thumbnail", e.target.files); // update avatar value
                  }}
                  accept="image/png, image/jpeg"
                />
              </label>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
        <button
          className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateBlogForm;
