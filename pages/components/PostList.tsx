import Link from "next/link";
import Tag from "../components/Tag";
import Image from "next/image";
const MAX_DISPLAY = 5;

const posts = [
  {
    slug: "example-post",
    date: "2024-05-17",
    title: "Example Post Title1",
    summary:
      "This is a short summary of the example post. It gives an overview of the content.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    slug: "example-post2 ",
    date: "2024-05-18",
    title: "Example Post Title2",
    summary:
      "This is a short summary of the example post. It gives an overview of the content.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    slug: "example-post3",
    date: "2024-05-19",
    title: "Example Post Title3",
    summary:
      "This is a short summary of the example post. It gives an overview of the content.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    slug: "example-post4",
    date: "2024-05-20",
    title: "Example Post Title4",
    summary:
      "This is a short summary of the example post. It gives an overview of the content.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    slug: "example-post5",
    date: "2024-05-17",
    title: "Example Post Title5",
    summary:
      "This is a short summary of the example post. It gives an overview of the content.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    slug: "example-post6",
    date: "2024-05-22",
    title: "Example Post Title6",
    summary:
      "This is a short summary of the example post. It gives an overview of the content.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
  // You can add more post objects in this array
];

const siteMetadata = {
  locale: "en-US",
};

function formatDate(dateString: string, locale: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(locale);
}

export default function PostList() {
  return (
    <>
      <div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:gap-8 xl:items-start xl:space-y-0">
                    <dl>
                      <dd className="flex flex-col justify-center items-center text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {formatDate(date, siteMetadata.locale)}
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
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
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
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* //   {siteMetadata.newsletter?.provider && (
    //     <div className="flex items-center justify-center pt-4">
    //       <NewsletterForm />
    //     </div>
    //   )} */}
    </>
  );
}
