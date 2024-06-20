import { getSectionByBlogId, noteSection } from "@/pages/actions/sectionAction";
import { useEffect, useState } from "react";
import Image from "./image";
import toast from "react-hot-toast";

interface PostProps {
  blog_id: string;
}

export default function Section({ blog_id }: PostProps) {
  const [sections, setSections] = useState<Section[]>();

  // const fetchBlog = async () => {
  //   setPosts((await getBlog(type, page)).data); // Update the return type of getBlog
  // };

  const fetchSections = async () => {
    try {
      const response = await getSectionByBlogId(blog_id);
      setSections(response.sections);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  useEffect(() => {
    fetchSections();
  }, [blog_id]);

  const handleNote = async (selectedSection: string) => {
    try {
      const response = await noteSection(selectedSection);
      toast.success("Note added successfully.");
    } catch (error) {
      console.error("Error note section:", error);
    }
  };

  const sectionList = Array.isArray(sections) ? sections : [];

  return (
    <>
      <div>
        <ul className="divide-y dark:divide-gray-700">
          {!sectionList.length && "No sections found."}
          {sectionList.map((section) => {
            const { caption, id } = section;
            return (
              <li className="py-12">
                <div className="prose max-w-none  dark:text-gray-700 mb-5">
                  <p className="text-xl">{caption}</p>
                </div>
                <Image id={id} />
                <button
                  onClick={() => handleNote(id)}
                  className="text-white bg-gray-800 hover:bg-blue-900 px-4 py-2 rounded-md mt-2"
                >
                  Note Section
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
