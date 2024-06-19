import {
  getNotedSections,
  getSectionByBlogId,
  noteSection,
  removeNote,
} from "@/pages/actions/userAction";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "@/pages/components/Post/image";
import { NextPage } from "next";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  const [sections, setSections] = useState<Section[]>();
  const [page, setPage] = useState(1);

  const fetchSections = async () => {
    try {
      const response = await getNotedSections(page);
      setSections(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  useEffect(() => {
    fetchSections();
  }, [page]);

  const handleRemoveNote = async (selectedSection: string) => {
    try {
      const response = await removeNote(selectedSection);
      toast.success("Note remove successfully.");
      fetchSections();
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
                <button onClick={() => handleRemoveNote(id)}>
                  Remove Note
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {page > 1 && (
        <div className="flex justify-right text-base font-medium leading-6">
          <button
            onClick={() => setPage((prevPage) => prevPage - 1)}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            &larr; back
          </button>
        </div>
      )}
      <div className="flex justify text-base font-medium leading-6">
        Page: {page}
      </div>

      {sectionList.length && (
        <div className="flex justify-end text-base font-medium leading-6">
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
};

IndexPage.getLayout = true;

export default IndexPage;
