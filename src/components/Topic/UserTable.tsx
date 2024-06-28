import React, { useMemo, useEffect, useState, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import UserAddModal from "./UserAddModal";
import { debounce } from "lodash";
import api from "@/src/util/lib/axiosClient";

interface User {
  id: number;
  avatar: string;
  username: string;
  role: string;
}

interface UserTableProps {
  topicId: string;
}

const { Authorization } = parseCookies();

const UserTable: React.FC<UserTableProps> = ({ topicId }) => {
  const [data, setData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteDebounced = useRef(
    debounce(async (user: string, topic: string) => {
      try {
        const response = await api.patch(
          `/user-topic/delete`,
          {
            user_id: user,
            topic_id: topic,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          toast.success(response.data.message);
          fetchData(topic); // Gọi lại fetchData sau khi xóa thành công
        } else {
          // In lỗi từ API
          console.error(
            "Failed to Remove User From Topic:",
            response.data.message
          );
          throw new Error("Failed to Remove User From Topic");
        }
      } catch (error) {
        console.error("Error removing user from topic:", error);
      }
    }, 300) // Thời gian debounce 300ms
  ).current;

  useEffect(() => {
    fetchData(topicId); // Fetch data ban đầu khi topicId thay đổi
  }, [topicId]);

  const fetchData = async (topic: string) => {
    try {
      const response = await api.get(`/user-topic/getusers?topic_id=${topic}`);

      if (!response.data) {
        throw new Error("Failed to fetch user data");
      }

      const users = response.data.metadata.map((item: any) => item.user);
      setData(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "avatar",
        header: "Avatar",
        cell: (info) => (
          <img
            className="w-8 h-8 rounded-full object-cover"
            alt="ava"
            src={info.getValue() as string}
          />
        ),
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "id",
        header: "Action",
        cell: (info) => (
          <button
            className="text-red-500"
            onClick={() =>
              handleDeleteDebounced(info.getValue() as string, topicId)
            }
          >
            🗑️ Delete
          </button>
        ),
      },
    ],
    [handleDeleteDebounced, topicId]
  );

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUserAdded = () => {
    fetchData(topicId); // Gọi lại fetchData khi thêm người dùng thành công
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Add User
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border-b border-gray-200 bg-gray-50"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border-b border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <UserAddModal
        isOpen={isModalOpen}
        onClose={closeModal}
        topic_id={topicId}
        onUserAdded={handleUserAdded} // Truyền hàm này để cập nhật khi thêm người dùng thành công
      />
    </>
  );
};

export default UserTable;
