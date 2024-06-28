import { parseCookies } from "nookies";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash"; // Import debounce from lodash
import api from "@/src/util/lib/axiosClient";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTopic: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [topicName, setTopicName] = useState<string>("");

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleTopicNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTopicName(event.target.value);
  };

  // Debounced handleSubmit function
  const handleSubmitDebounced = debounce(async () => {
    try {
      const response = await api.post(
        "/topic/create",
        { type: selectedType, topic_name: topicName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Topic created successfully.");
        setTopicName("");
        setSelectedType("");
        onClose();
      } else {
        console.error("Failed to create topic:", response.data);
        toast.error("Failed to create topic.");
      }
    } catch (error) {
      console.error("Error creating topic:", error);
      toast.error("Error creating topic.");
    }
  }, 300); // Debounce delay of 300ms

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitDebounced(); // Call the debounced function
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center w-auto">
      <div className="relative p-4 rounded w-fit bg-white">
        {/* Modal header */}
        <div className="flex justify-between items-center bg-indigo-500 text-white px-4 py-2 rounded-t-lg">
          <h2 className="text-2xl font-semibold">Create Topic</h2>
          <button
            type="button"
            title="Close Create Topic Modal"
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
        {/* Modal body */}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="topicType" className="block mb-1">
              Select a Type:
            </label>
            <select
              id="topicType"
              className="p-2 border border-gray-300 rounded"
              value={selectedType}
              onChange={handleTypeChange}
              required
            >
              <option value="">Select Type</option>
              <option value="team">Team</option>
              <option value="project">Project</option>
              {/* Add other options as needed */}
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="topicName" className="block mb-1">
              Topic Name:
            </label>
            <input
              type="text"
              id="topicName"
              value={topicName}
              onChange={handleTopicNameChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Topic
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTopic;
