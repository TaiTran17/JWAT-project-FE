import React from "react";
import Link from "next/link";
import Tag from "../components/Tag";
import { debounce } from "lodash";

const MAX_DISPLAY = 5;

const siteMetadata = {
  locale: "en-US",
};

function formatDate(dateString: string, locale: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(locale, options);
}

interface Blog {
  id: string;
  topic: { topic_name: string };
  createdAt: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface PageProps {
  posts: Blog[];
  type: string;
  page: number;
  setPage: (page: number) => void;
}

const PostList: React.FC<PageProps> = ({ posts, type, page, setPage }) => {
  // Debounce setPage function
  const debouncedSetPage = debounce(setPage, 300);

  const handlePageChange = (newPage: number) => {
    debouncedSetPage(newPage);
  };

  return (
    <>
      <div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts?.length && "No posts found."}
          {posts?.slice(0, MAX_DISPLAY).map((post) => {
            const { topic, createdAt, title, description, id, thumbnail } =
              post;
            return (
              <li key={id} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:gap-8 xl:items-start xl:space-y-0">
                    <dl>
                      <dd className="flex flex-col justify-center items-center text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <img
                          src={thumbnail}
                          alt=""
                          className="rounded-lg w-full h-full object-cover"
                        />
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${id}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <time
                            dateTime={createdAt}
                            className="font-medium text-lg text-gray-600 leading-6"
                          >
                            Date: {formatDate(createdAt, siteMetadata.locale)}
                          </time>
                          <div className="flex flex-wrap mt-2">
                            {type !== "company" && (
                              <Tag text={topic.topic_name} />
                            )}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {description}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${id}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${id}"`}
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

      <div className="flex justify-center">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            «
          </button>
          <button className="join-item btn">{page}</button>
          <button
            className="join-item btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={posts?.length < MAX_DISPLAY}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default PostList;
