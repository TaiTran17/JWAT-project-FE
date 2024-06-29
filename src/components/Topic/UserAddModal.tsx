import React, { useEffect, useRef, useState } from "react";
import UserList from "./UserList";
import { parseCookies } from "nookies";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import api from "@/src/util/lib/axiosClient";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic_id: string;
  onUserAdded: () => void; // Thêm prop này để gọi lại khi thêm người dùng thành công
}

const UserAddModal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  topic_id,
  onUserAdded,
}) => {
  if (!isOpen) return null;
  const [users, setUsers] = useState<User[]>([]);

  const handleAddUser = async (user: User) => {
    try {
      const response = await api.post(
        `/user-topic/adduser`,
        {
          user_id: user.id,
          topic_id: topic_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        toast.success(response.data.message);
        onUserAdded(); // Gọi lại khi thêm người dùng thành công
        onClose();
      } else {
        toast.error(response.data.message);
        throw new Error("Failed to add user to topic");
      }
    } catch (error) {
      console.error("Error adding user to topic:", error);
    }
  };

  const handleAddUserDebounced = useRef(
    debounce((user: User) => handleAddUser(user), 300)
  ).current;

  const handleSearch = async (query: string) => {
    const response = await api.get(`/user/search?query=${query}`);

    setUsers(response.data.metadata);
  };

  const handleSearchDebounced = useRef(
    debounce((query: string) => handleSearch(query), 300)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchDebounced(e.target.value);
  };

  useEffect(() => {
    return () => {
      handleSearchDebounced.cancel();
      handleAddUserDebounced.cancel();
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center w-auto ">
        <div className="relative p-4 rounded w-1/3 bg-white">
          {/* Modal header */}
          <div className="flex justify-between bg-indigo-500 text-white px-4 py-2 rounded-lg">
            <h2 className="text-2xl font-semibold font-serif ">
              Add User Into Topic
            </h2>
            <div></div>
            <button
              type="button"
              title="Close Add User Modal"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <input
            placeholder="Add Users eg: John, Piyush, Jane"
            onChange={handleInputChange}
            className="my-4 input input-bordered w-full"
          ></input>

          <div className="h-64 overflow-y-auto border p-4">
            {users.map((u) => (
              <UserList
                key={u.id}
                user={u}
                handleFunction={() => handleAddUserDebounced(u)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAddModal;
