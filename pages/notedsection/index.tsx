import { getNotedSections, removeNote } from "@/pages/actions/sectionAction";
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
      <div className="flex justify-center">
        {page > 1 && (
          <a
            onClick={() => setPage((prevPage) => prevPage - 1)}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="All posts"
          >
            &larr; back
          </a>
        )}
        <div className="flex justify text-base font-medium leading-6 ml-3 mt-1">
          {page}
        </div>

        {sectionList.length && (
          <a
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="All posts"
          >
            Next &rarr;
          </a>
        )}
      </div>
    </>
  );
};

IndexPage.getLayout = true;

export default IndexPage;
