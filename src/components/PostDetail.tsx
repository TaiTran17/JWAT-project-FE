// import Carousel from "@/components/SlidePic";
// import avatar from "../../util/tải xuống.png";
// import Image from "next/image";
// import SlidePic from "@/components/SlidePic";
// import ChatComment from "@/components/Comment";

export default function PostDetail() {
  return (
    <>
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                August 5 , 2023
              </div>
              <div>
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  Release of Tailwing Nextjs Starter Blog v2.0
                </h1>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-3xl divide-y px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                <h2>
                  Reading does not scale but experiences built upon standardized
                  metadata do
                </h2>
                <p>
                  Reading is a great way to learn about a code repository or an
                  open source package that you use as a dependency to a code
                  project, but it does not scale to hundreds or thousands of
                  code repositories or packages. This fact opens up
                  opportunities to leverage metadata from code repositories and
                  package managers to create experiences that help users do
                  things as if we had read thousands of code repositories or
                  packages.
                </p>
                <div>{/* <SlidePic /> */}</div>

                <div className="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
                  <div className="w-full mt-16 md:mt-0 ">
                    <form className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
                      <h3 className="mb-6 text-2xl font-medium text-center">
                        Write a comment
                      </h3>
                      <textarea
                        name="comment"
                        className="w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                        placeholder="Write your comment"
                        rows={5}
                        cols={33}
                      ></textarea>
                      <input
                        type="submit"
                        value="Submit comment"
                        name="submit"
                        className=" text-white px-4 py-3 bg-blue-500  rounded-lg"
                      />
                    </form>
                  </div>
                </div>

                {/* Comment zone */}
                <h3 className="flex justify-center">COMMENT ZONE</h3>

                <div className="max-w-4xl px-10 py-16 mx-auto bg-gray-100  bg-white min-w-screen animation-fade animation-delay  px-0 px-8 mx-auto sm:px-12 xl:px-5">
                  <p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
                    All comments on this post
                  </p>
                  <div className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
                    <a href="#" className="flex items-center mt-6 mb-6 mr-6">
                      <img
                        src="https://avatars.githubusercontent.com/u/71964085?v=4"
                        alt="avatar"
                        className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                      />
                    </a>

                    <div>
                      <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                        By James Amos
                      </h3>
                      <p className="text-sm font-bold text-gray-300">
                        August 22,2021
                      </p>
                      <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                        Please help with how you did the migrations for the blog
                        database fields.I tried mine using exactly what you
                        instructed but its not working!!.
                      </p>
                    </div>
                  </div>
                  <div className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
                    <a href="#" className="flex items-center mt-6 mb-6 mr-6">
                      <img
                        src="https://avatars.githubusercontent.com/u/71964085?v=4"
                        alt="avatar"
                        className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                      />
                    </a>

                    <div>
                      <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                        By James Amos
                      </h3>
                      <p className="text-sm font-bold text-gray-300">
                        August 22,2021
                      </p>
                      <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                        Especially I dont understand the concepts of multiple
                        models.What really is the difference between the blog
                        model and blogApp model? Am stuck
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
