import { loginUser } from "@/pages/actions/userAction";
import Modal from "@/pages/components/Modal";
import { userInfoSchema } from "@/schema/userInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export const LoginForm = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(userInfoSchema),
  });

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const result = await loginAction(formData);
    if (result.success) {
      toast.success(result.message);
      router.push("/company");
    } else {
      toast.error(result.message);
    }
  };

  const loginAction = async (formData: FormData) => {
    const userLogin = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const result = userInfoSchema.safeParse(userLogin);

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

    return loginUser({
      username: userLogin.username as string,
      password: userLogin.password as string,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
      >
        <div className="pb-2 pt-4">
          <input
            type="username"
            id="username"
            {...register("username")}
            placeholder="Username"
            className=" block w-full p-4 text-lg rounded-sm bg-black"
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}
        </div>
        <div className="pb-2 pt-4">
          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="Password"
            className="block w-full p-4 text-lg rounded-sm bg-black"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
          <a href="#" onClick={openModal}>
            Create an account
          </a>
        </div>
        <div className="px-4 pb-2 pt-4">
          <button
            type="submit"
            className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
          >
            Sign In
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
