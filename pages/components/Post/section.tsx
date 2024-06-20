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
      setSections(response.data);
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
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!sectionList.length && "No sections found."}
          {sectionList.map((section) => {
            const { caption, id } = section;
            return (
              <li className="py-12">
                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                  {caption}
                </div>
                <Image id={id} />
                <button onClick={() => handleNote(id)}>Add Note</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
