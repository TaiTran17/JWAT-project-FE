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

                <h3 className="flex justify-center">COMMENT ZONE</h3>
                {/* <div className="bg-base-200 p-4 rounded-xl  ">
                  <ChatComment />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
