import { getImagesBySectionId } from "@/pages/actions/imageAction";
import { useEffect, useState } from "react";

interface PostProps {
  id: string;
}

export default function Image({ id }: PostProps) {
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ImagesList.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + ImagesList.length) % ImagesList.length
    );
  };

  const fetchImages = async () => {
    try {
      const response = await getImagesBySectionId(id);
      setImages(response.data);
      console.log("Check img", response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [id]);

  const ImagesList = Array.isArray(images) ? images : [];

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
              {!ImagesList.length && "No images found."}
              {ImagesList.map((image) => {
                return (
                  <>
                    <div>
                      <img
                        src={ImagesList[currentIndex].url}
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt={`Image ${currentIndex + 1}`}
                      />
                      <div className="image-index">
                        Image {currentIndex + 1} of {ImagesList.length}
                      </div>
                    </div>
                    <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                      <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="true"
                        aria-label="Slide 1"
                        data-carousel-slide-to="0"
                      >
                        {currentIndex + 1}/{ImagesList.length}
                      </button>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                      data-carousel-prev
                      onClick={handlePrevious}
                    >
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                          className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                        <span className="sr-only">Previous</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                      data-carousel-next
                      onClick={handleNext}
                    >
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white    group-focus:outline-none">
                        <svg
                          className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                        <span className="sr-only">Next</span>
                      </span>
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
