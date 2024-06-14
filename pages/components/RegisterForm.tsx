"use client";

import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@/schema/userInfo";
import { registerUser } from "@/pages/actions/userAction";
import { toast } from "react-hot-toast";

interface IRegisterForm {
  onClose: () => void;
}

const RegisterForm: React.FC<IRegisterForm> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // add setValue
  } = useForm<UserInputs>({
    defaultValues: {
      username: "",
      password: "",
      avatar: null,
    },
    resolver: zodResolver(userInfoSchema),
  });

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    // Append only the file name to formData
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    const result = await registerAction(formData);
    if (result.success) {
      toast.success(result.message);
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  const registerAction = async (formData: FormData) => {
    const newUser = {
      username: formData.get("username"),
      password: formData.get("password"),
      avatar: formData.get("avatar"),
    };

    const result = userInfoSchema.safeParse(newUser);

    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage += `${issue.path[0]}: ${issue.message}. `;
      });

      return {
        success: false,
        message: errorMessage,
      };
    }

    const response = await registerUser({
      username: newUser.username as string,
      password: newUser.password as string,
      avatar: newUser.avatar as File,
    });
    if (response?.error) {
      return {
        success: false,
        message: response.error,
      };
    } else {
      return {
        success: true,
        message: "User registered successfully",
      };
    }
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

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedFile(null); // clear the selected file
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white mx-auto px-4 lg:px-6 py-8 shadow-lg flex flex-col lg:flex-col rounded-b-md"
    >
      <div className="flex flex-row">
        <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r-2 lg:border-slate-300">
          <div className="mb-2">
            <label
              htmlFor="username"
              className="text-neutral-800 font-bold text-lg mb-2 block font-mono"
            >
              UserName
            </label>

            <input
              type="text"
              id="username"
              placeholder="username"
              className="flex h-8 w-full rounded-md border-2 px-4 py-1.5 text-md text-black"
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="text-red-600">{errors.username?.message}</p>
            )}
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="text-neutral-800 font-bold text-lg mb-2 block font-mono"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="flex h-8 w-full rounded-md border-2 px-4 py-1.5 text-md text-black"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-1/3 lg:pl-8">
          <label
            htmlFor="avatar"
            className="text-neutral-800 font-bold text-lg mb-2 block font-mono"
          >
            User's Avatar
          </label>
          {selectedImage ? (
            <div className="flex items-center justify-center w-full mt-4 group">
              <img
                src={selectedImage}
                alt="Selected"
                className="rounded-full w-32 h-32 object-cover"
                onClick={handleImageClick}
              />
              <button
                onClick={handleClose}
                className="relative h-auto -top-14 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                {...register("avatar")}
                onChange={(e) => {
                  handleImageUpload(e);
                  setValue("avatar", e.target.files); // update avatar value
                }}
                accept="image/png, image/jpeg"
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-32 h-32 hover:bg-gray-100 hover:border-purple-300 justify-center group rounded-full">
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
                    name="avatar"
                    className="hidden"
                    {...register("avatar")}
                    onChange={(e) => {
                      handleImageUpload(e);
                      setValue("avatar", e.target.files); // update avatar value
                    }}
                    accept="image/png, image/jpeg"
                  />
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-4 flex justify-center gap-x-4 rounded-b-lg">
        <button
          type="submit"
          className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
        >
          Sign In
        </button>
        <button
          onClick={onClose}
          type="button"
          className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
