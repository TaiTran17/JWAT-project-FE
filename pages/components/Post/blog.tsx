import { getBlogDetail } from "@/pages/actions/userAction";
import { useEffect, useState } from "react";

interface PostProps {
  blog_id: string;
}

function formatDate(dateString: string, locale: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(locale);
}
const siteMetadata = {
  locale: "en-US",
};

export default function Blog({ blog_id }: PostProps) {
  const [blog, setBlog] = useState<Blog>();

  const fetchBlog = async () => {
    try {
      const response = await getBlogDetail(blog_id);
      setBlog(response.data); // Cập nhật kiểu trả về của getBlog nếu cần
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blog_id]);

  if (!blog) {
    return <div>No post found.</div>;
  }
  return (
    <div className="flex flex-col box-border items-center justify-center ">
      <div className="w-3/4 h-fit block mx-10 mb-5 max-h-96  font-bold text-black   p-24 uppercase text-center">
        <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 mb-5">
          <time dateTime={blog.createdAt}>
            {formatDate(blog.createdAt, siteMetadata.locale)}
          </time>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {blog.title}
          </h1>
        </div>
      </div>
      <div className="w-full h-auto">
        <img src={blog.thumbnail} alt="" className="w-full h-[500px]" />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-3/4 h-fit block mx-10 my-5 max-h-96 font-serif text-black   p-24 uppercase text-center justify-center">
          {blog.description}
        </div>
      </div>
    </div>
  );
}
