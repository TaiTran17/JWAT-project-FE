import { getBlogDetail } from "@/src/util/actions/blogACtion";
import { useEffect, useState } from "react";

interface BlogProps {
  // blog_id: string;
  blogData: BlogData;
}

function formatDate(dateString: string, locale: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(locale);
}
const siteMetadata = {
  locale: "en-US",
};

const Blog: React.FC<BlogProps> = ({ blogData }) => {
  if (!blogData) {
    return <div>No post found.</div>;
  }

  return (
    <div className="flex flex-col box-border items-center justify-center ">
      <div className="w-full h-fit block mx-10 mb-2 max-h-96 font-bold text-black p-24 uppercase text-center">
        <div className="text-2xl font-medium leading-6 text-gray-500 dark:text-gray-400 mb-5">
          <time dateTime={blogData.createdAt}>
            {formatDate(blogData.createdAt, siteMetadata.locale)}
          </time>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {blogData.title}
          </h1>
        </div>
      </div>
      <div className="w-screen h-auto">
        <img
          src={blogData.thumbnail}
          alt=""
          className="w-full h-auto rounded-lg transition duration-200 ease-out transform hover:scale-110"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full md:w-3/4  h-fit block mx-10 my-5 max-h-96 font-serif text-black p-24 uppercase text-center justify-center ">
          {blogData.description}
        </div>
      </div>
    </div>
  );
};

export default Blog;
