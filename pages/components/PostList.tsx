import Link from "next/link";
import Tag from "../components/Tag";
import Image from "next/image";
import { getBlog } from "@/pages/actions/userAction";
import { useEffect, useState } from "react";
const MAX_DISPLAY = 5;

const siteMetadata = {
  locale: "en-US",
};

function formatDate(dateString: string, locale: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(locale);
}

interface pageProps {
  type: string;
}

export default function PostList({ type }: pageProps) {
  const [postss, setPosts] = useState<Blog[]>();
  const [page, setPage] = useState(1);

  // const fetchBlog = async () => {
  //   setPosts((await getBlog(type, page)).data); // Update the return type of getBlog
  // };

  const fetchBlog = async () => {
    try {
      const response = await getBlog(type, page);
      setPosts(response.data); // Cập nhật kiểu trả về của getBlog nếu cần
      console.log(response.data);
      console.log("Page", page);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [page, type]);

  const posts = Array.isArray(postss) ? postss : [];

  return (
    <>
      <div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { topic, createdAt, title, description } = post;
            return (
              <li key={type} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:gap-8 xl:items-start xl:space-y-0">
                    <dl>
                      <dd className="flex flex-col justify-center items-center text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={createdAt}>
                          {formatDate(createdAt, siteMetadata.locale)}
                        </time>
                        <Image
                          src={
                            "https://images.photowall.com/products/42556/summer-landscape-with-river.jpg?h=699&q=85"
                          }
                          alt={""}
                          width={500}
                          height={500}
                        />
                        <div></div>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${type}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            <Tag text={topic.topic_name} />
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {description}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${type}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
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

      {posts.length && (
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
      {/* {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  );
}
