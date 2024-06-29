import { GetServerSideProps, NextPage } from "next";
import UserTable from "@/src/components/Topic/UserTable";
import { useState, useEffect } from "react";
import nookies, { parseCookies } from "nookies";
import CreateTopic from "../../components/Topic/CreateTopic";
import api from "@/src/util/lib/axiosClient";
import { notFound } from "next/navigation";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTopicModal = () => {
    setIsTopicModalOpen(true);
  };

  const closeTopicModal = () => {
    setIsTopicModalOpen(false);
  };

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
    setSelectedTopic("");
  };

  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedType) {
        try {
          const response = await api.get(
            `/topic/getbytype?type=${selectedType}`
          );
          if (response.data) {
            setTopics(response.data.metadata);
          } else {
            throw new Error("Failed to fetch topic data");
          }
        } catch (error) {
          console.error("Error to fetch topic data", error);
          return {
            notFound: true,
          };
        }
      }
    };

    fetchTopics();
  }, [selectedType]);

  return (
    <>
      <section className="py-8 flex flex-col items-center justify-center border-solid border-blue-400 shadow-md rounded-md">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openTopicModal}
        >
          Create Topic
        </button>

        <div className="flex justify-evenly items-baseline gap-8 py-8 h-28">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openTopicModal}
          >
            Add User
          </button>
          <div className="my-4">
            <label htmlFor="topicId" className="text-base font-medium">
              Select a Type:
            </label>
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
              <label htmlFor="topicName" className="text-base font-medium">
                Select a Topic Name:
              </label>
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
        </div>
      </section>

      <UserTable topicId={selectedTopic} />
      <CreateTopic isOpen={isTopicModalOpen} onClose={closeTopicModal} />
    </>
  );
};

IndexPage.getLayout = true;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const token = cookies.Authorization || "";

  if (!token) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      authenticated: true,
    },
  };
};

export default IndexPage;
