import { NextPage } from "next";
import UserTable from "@/pages/components/Topic/UserTable";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import CreateTopic from "../components/Topic/CreateTopic";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedType) {
        try {
          const { Authorization } = parseCookies();
          const response = await fetch(
            `http://localhost:3000/topic/getbytype?type=${selectedType}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Authorization}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            const topics = data.metadata;
            setTopics(topics);
          } else {
            throw new Error("Failed to fetch topic data");
          }
        } catch (error) {
          console.error("Error to fetch topic data", error);
        }
      }
    };

    fetchTopics();
  }, [selectedType]);

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        create Topic
      </button>
      <CreateTopic isOpen={isModalOpen} onClose={closeModal} />
      <div className="my-4">
        <label htmlFor="topicId">Select a Type:</label>
        <select
          id="topicId"
          className="ml-2 p-2 border border-gray-300 rounded"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Select Type</option>
          <option value="team">Team</option>
          <option value="project">Project</option>
          {/* Thêm các option khác tương ứng với các topicId mà bạn muốn */}
        </select>
      </div>

      {selectedType && (
        <div className="my-4">
          <label htmlFor="topicName">Select a Topic Name:</label>
          <select
            id="topicName"
            value={selectedTopic}
            onChange={handleTopicChange}
            className="ml-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Topic Name</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.topic_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <UserTable topicId={selectedTopic} />
    </>
  );
};

IndexPage.getLayout = true;
export default IndexPage;
