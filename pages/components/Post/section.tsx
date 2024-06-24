import React from "react";
import Image from "./image";
import toast from "react-hot-toast";

interface Section {
  id: string;
  caption: string;
  // Add other properties as needed
}

interface SectionProps {
  blogId: string;
  sectionData: Section[];
}

const SectionComponent: React.FC<SectionProps> = ({ blogId, sectionData }) => {
  const handleNote = async (selectedSectionId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/noteSection/${selectedSectionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            section_id: selectedSectionId,
            blog_id: blogId,
          }),
        }
      );
      if (response.ok) {
        toast.success("Note added successfully.");
      } else {
        throw new Error("Failed to note section");
      }
    } catch (error) {
      console.error("Error noting section:", error);
    }
  };

  return (
    <div>
      <ul className="divide-y dark:divide-gray-700">
        {!sectionData?.length && <p>No sections found.</p>}
        {sectionData?.map((section) => (
          <li key={section.id} className="py-12">
            <div className="prose max-w-none dark:text-gray-700 mb-5">
              <p className="text-xl">{section.caption}</p>
            </div>
            <Image id={section.id} />
            <button
              onClick={() => handleNote(section.id)}
              className="text-white bg-gray-800 hover:bg-blue-900 px-4 py-2 rounded-md mt-2"
            >
              Note Section
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionComponent;
