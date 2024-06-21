import { useState, useEffect } from "react";
import { NextPage } from "next";
import PostList from "@/pages/components/PostList";
import nookies, { parseCookies } from "nookies";

interface Blog {
  id: string;
  topic: { topic_name: string };
  createdAt: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface IndexPageProps {
  initialPosts: Blog[];
  initialType: string;
}

const IndexPage: NextPage<IndexPageProps> & {
  getLayout?: (page: JSX.Element, props: IndexPageProps) => JSX.Element;
} = ({ initialPosts, initialType }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [type] = useState(initialType); // type is not changing, so no need for setter
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:3000/blog?type=${type}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parseCookies().Authorization}`,
          },
        }
      );

      if (response.ok) {
        const newPosts = await response.json();
        setPosts(newPosts);
      }
    };

    fetchPosts();
  }, [page, type]);

  return (
    <>
      <img
        src="https://res.cloudinary.com/de22izcfb/image/upload/v1718901225/nwsftsfza8q2io6omgja.png"
        alt="background"
      />
      <PostList posts={posts} type={type} page={page} setPage={setPage} />
    </>
  );
};

// Define the getLayout property
IndexPage.getLayout = (page, props) => {
  return <>{page}</>;
};

export default IndexPage;

export const getServerSideProps = async (context: any) => {
  const type = "company";
  const page = 1;

  // Parse cookies from the server-side request
  const cookies = nookies.get(context);
  const token = cookies.Authorization || "";

  const response = await fetch(
    `http://localhost:3000/blog?type=${type}&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const posts = await response.json();

  return {
    props: {
      initialPosts: posts,
      initialType: type,
    },
  };
};
