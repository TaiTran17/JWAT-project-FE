import { addImageSection } from "@/pages/actions/sectionAction";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: { id: string; caption: string } | null; // Define the type for section prop
}

const SectionModal: React.FC<IModalProps> = ({ isOpen, onClose, section }) => {
  const [files, setFiles] = useState<File[]>([]);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
    }
  };

  const uploadImages = async () => {
    if (section && files.length > 0) {
      const formData = new FormData();
      formData.append("section_id", section.id.toString());
      files.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const result = await addImageSection(formData, section.id);
        if (result.success) {
          toast.success(result.message);
          onClose(); // Close modal or perform any necessary action
          setFiles([]); // Reset files state to empty array
          console.log("Check res", result);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error uploading images:", error);
        // Handle or propagate the error as needed
        toast.error("Error uploading images");
      }
    } else {
      console.error("Section or files are missing.");
      toast.error("Section or files are missing.");
    }
  };

  const handleButtonClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center w-auto">
      <div className="relative p-4 rounded w-2/3 bg-white">
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Caption
          </label>
          <input
            id="title"
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            value={section?.caption}
            readOnly
          />
        </div>
        <section className="overflow-auto p-8 w-full h-full flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Select image for this memory</span>
            </p>
            <input
              id="hidden-input"
              type="file"
              multiple
              className="hidden"
              ref={hiddenFileInput}
              onChange={handleFileUpload}
            />
            <button
              id="button"
              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              onClick={handleButtonClick}
            >
              Upload images
            </button>
          </header>

          <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>

          <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
            {files.length === 0 && (
              <li
                id="empty"
                className="h-full w-full text-center flex flex-col items-center justify-center items-center"
              >
                <img
                  className="mx-auto w-32"
                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  alt="no data"
                />
                <span className="text-small text-gray-500">
                  No files selected
                </span>
              </li>
            )}
            {files.map((file, index) => (
              <li
                key={index}
                className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
              >
                <article
                  tabIndex={0}
                  className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer shadow-sm"
                >
                  <img
                    alt="upload preview"
                    className="image-full w-full h-full sticky object-cover rounded-md bg-fixed"
                    src={URL.createObjectURL(file)}
                  />
                  <button
                    className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                    type="button"
                    onClick={() => handleDelete(index)}
                  >
                    <svg
                      className="w-4 h-4 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex w-full justify-center items-center gap-7">
          <button
            className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            onClick={uploadImages}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionModal;
