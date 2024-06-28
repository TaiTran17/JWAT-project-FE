import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { getImagesBySectionId } from "@/pages/actions/imageAction";

interface ImageProps {
  id: string;
}

const ImageComponent: React.FC<ImageProps> = ({ id }) => {
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputIndex, setInputIndex] = useState<string>("");

  const handleNext = debounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ImagesList.length);
  }, 300); // Debounce with 300ms delay

  const handlePrevious = debounce(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + ImagesList.length) % ImagesList.length
    );
  }, 300); // Debounce with 300ms delay

  const fetchImages = async () => {
    try {
      const response = await getImagesBySectionId(id);
      setImages(response.data);
      console.log("Check img", response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [id]);

  const ImagesList = Array.isArray(images) ? images : [];

  const handleChangeIndex = (index: number) => {
    setCurrentIndex(index);
    setInputIndex("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(event.target.value);
  };

  const handleInputBlur = () => {
    if (inputIndex.trim() !== "") {
      const index = parseInt(inputIndex, 10) - 1;
      if (index >= 0 && index < ImagesList.length) {
        setCurrentIndex(index);
      }
    }
  };

  return (
    <>
      <section>
        <div className="w-full flex flex-col justify-center items-center">
          <div
            id="indicators-carousel"
            className="relative w-full"
            data-carousel="static"
          >
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {!ImagesList.length && (
                <p className="text-center">No images found.</p>
              )}
              {ImagesList.length > 0 && (
                <div>
                  <img
                    src={ImagesList[currentIndex].url}
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt={`Image ${currentIndex + 1}`}
                  />
                  <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                    <span className="text-white bg-gray-800 bg-opacity-70 px-2 py-1 rounded">
                      Image{" "}
                      <input
                        placeholder="1"
                        type="text"
                        className="ml-2 w-9 py-1 px-2 text-white   bg-transparent  border border-gray-500 rounded-md focus:outline-none focus:border-gray-500"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min="1"
                        max={ImagesList.length}
                        value={currentIndex + 1}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            const index = parseInt(value, 10);
                            if (index >= 1 && index <= ImagesList.length) {
                              setCurrentIndex(index - 1);
                            }
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            const index = parseInt(value, 10);
                            setCurrentIndex(
                              Math.min(
                                Math.max(index - 1, 0),
                                ImagesList.length - 1
                              )
                            );
                          }
                        }}
                      />{" "}
                      of {ImagesList.length}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handlePrevious}
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:bg-white/50   focus:outline-none">
                      <svg
                        className="w-6 h-6 text-black dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                      <span className="sr-only">Previous</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handleNext}
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:bg-white/50  focus:outline-none">
                      <svg
                        className="w-6 h-6 text-black dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span className="sr-only">Next</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageComponent;
