import React from "react";
import Image from "./image";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import api from "@/src/util/lib/axiosClient";

interface Section {
  id: string;
  caption: string;
  // Add other properties as needed
}

interface SectionProps {
  sectionData: Section[];
}

const SectionComponent: React.FC<SectionProps> = ({ sectionData }) => {
  const handleNote = debounce(async (selectedSectionId: string) => {
    try {
      const response = await api.post(
        `/note/addnote?section_id=${selectedSectionId}`
      );
      if (response.data) {
        toast.success("Note added successfully.");
      } else {
        throw new Error("Failed to note section");
      }
    } catch (error) {
      console.error("Error noting section:", error);
    }
  }, 300); // Debounce with 300ms delay

  return (
    <div>
      <ul className="divide-y dark:divide-gray-700 ">
        {!sectionData?.length && <p>No sections found.</p>}
        {sectionData?.map((section) => (
          <li key={section.id} className="py-12">
            <div className="prose max-w-none mb-10">
              <p className="uppercase text-xl text-center leading-6 text-gray-600 font-medium">
                {section.caption}
              </p>
            </div>
            <Image id={section.id} />

            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => handleNote(section.id)}
                className="text-white items-center bg-gray-800 hover:bg-blue-900 px-4 py-2 rounded-md mt-2"
              >
                Note Section
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionComponent;
