import { useState, useEffect } from "react";
import { NextPage } from "next";
import PostList from "@/src/components/PostList";
import nookies, { parseCookies } from "nookies";
import api from "@/src/util/lib/axiosClient";

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
      const response = await api.get(`/blog?type=${type}&page=${page}`);

      if (response.data) {
        setPosts(response.data.metadata);
      }
    };

    fetchPosts();
  }, [page, type]);

  return (
    <>
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
  const type = "team";
  const page = 1;

  try {
    // Parse cookies from the server-side request
    const cookies = nookies.get(context);
    const token = cookies.Authorization || "";

    const response = await api.get(`/blog?type=${type}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        initialPosts: response.data.metadata,
        initialType: type,
      },
    };
  } catch (error) {
    console.error("Error fetching ", error);
    return {
      notFound: true,
    };
  }
};
