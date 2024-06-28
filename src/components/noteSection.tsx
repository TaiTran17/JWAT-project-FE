import React from "react";
import Image from "./Post/image";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";
import { debounce } from "lodash";
import api from "../util/lib/axiosClient";

interface Section {
  id: string;
  caption: string;
  // Add other properties as needed
}

interface NoteSectionProps {
  notedSections: Section[];
  page: number;
  setPage: (page: number) => void;
  fetchSections: () => void;
}

const NotedSectionComponent: React.FC<NoteSectionProps> = ({
  notedSections,
  page,
  setPage,
  fetchSections,
}) => {
  const handleRemoveNote = debounce(async (selectedSection: string) => {
    try {
      const response = await api.patch(
        `/note/delete?section_id=${selectedSection}`
      );
      if (response.data) {
        toast.success("Note deleted successfully.");
        fetchSections();
      } else {
        throw new Error("Failed to delete noted section");
      }
    } catch (error) {
      console.error("Error removing noted section:", error);
    }
  }, 300); // Debounce with 300ms delay

  const handleSetPage = debounce((newPage: number) => {
    setPage(newPage);
  }, 300); // Debounce with 300ms delay

  return (
    <div>
      <ul className="divide-y dark:divide-gray-700">
        {!notedSections?.length && <p>No noted sections found.</p>}
        {notedSections?.map((section) => (
          <li key={section.id} className="py-12">
            <div className="prose max-w-none dark:text-gray-700 mb-5">
              <p className="uppercase text-xl text-center leading-6 text-gray-600 font-medium">
                {section.caption}
              </p>
            </div>
            <Image id={section.id} />

            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => handleRemoveNote(section.id)}
                className="text-white bg-red-500 hover:bg-red-900 px-4 py-2 rounded-md mt-2"
              >
                Remove Note
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => handleSetPage(page - 1)}
            disabled={page <= 1}
          >
            «
          </button>
          <button className="join-item btn">{page}</button>
          <button
            className="join-item btn"
            onClick={() => handleSetPage(page + 1)}
            disabled={notedSections?.length < 5}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotedSectionComponent;
