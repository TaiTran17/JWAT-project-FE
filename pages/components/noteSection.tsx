import React from "react";
import Image from "./Post/image";
import { GetServerSideProps, NextPage } from "next";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";

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
  const handleRemoveNote = async (selectedSection: string) => {
    try {
      const { Authorization } = parseCookies();
      const response = await fetch(
        `http://localhost:3000/note/delete?section_id=${selectedSection}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Authorization}`,
          },
        }
      );
      if (response.ok) {
        toast.success("Note delete successfully.");
        fetchSections();
      } else {
        throw new Error("Failed to delete noted section");
      }
    } catch (error) {
      console.error("Error remove noted section:", error);
    }
  };
  return (
    <div>
      <ul className="divide-y dark:divide-gray-700">
        {!notedSections?.length && <p>No noted sections found.</p>}
        {notedSections?.map((section) => (
          <li key={section.id} className="py-12">
            <div className="prose max-w-none dark:text-gray-700 mb-5">
              <p className="text-xl">{section.caption}</p>
            </div>
            <Image id={section.id} />
            <button
              onClick={() => handleRemoveNote(section.id)}
              className="text-white bg-gray-800 hover:bg-blue-900 px-4 py-2 rounded-md mt-2"
            >
              Remove Note
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
          >
            «
          </button>
          <button className="join-item btn">{page}</button>
          <button
            className="join-item btn"
            onClick={() => setPage(page + 1)}
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
