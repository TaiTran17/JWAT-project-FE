import Blog from "@/src/components/Post/blog";
import Comment from "@/src/components/Post/comment";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import nookies, { parseCookies } from "nookies";
import SectionComponent from "@/src/components/Post/section";
import api from "@/src/util/lib/axiosClient";

interface IndexPageProps {
  blogData: BlogData;
  sectionData: Section[];
  commentsData: Commentt[];
}

const IndexPage: NextPage<IndexPageProps> & {
  getLayout?: (page: JSX.Element, props: IndexPageProps) => JSX.Element;
} = ({ blogData, sectionData, commentsData }) => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Blog blogData={blogData}></Blog>
      <SectionComponent sectionData={sectionData}></SectionComponent>
      <Comment initialComments={commentsData}></Comment>
    </>
  );
};

// This function gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params; // Assuming 'id' is part of context.params
  const cookies = nookies.get(context);
  const token = cookies.Authorization || "";
  try {
    // Fetch blog data
    const blogRes = await api.get(`/blog/getbyBlogId?blog_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blogData: BlogData = await blogRes.data.metadata;

    // Fetch section data
    const sectionRes = await api.get(`/section?blog_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!sectionRes.data) {
      console.error("Failed to fetch section data:", sectionRes.statusText);
      throw new Error("Failed to fetch section data");
    }
    const sectionData: Section[] = await sectionRes.data.metadata;

    // Fetch comments data
    const commentsRes = await api.get(`/comment/getbyblog?blog_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!commentsRes.data) {
      console.error("Failed to fetch comments data:", commentsRes.statusText);
      throw new Error("Failed to fetch comments data");
    }

    const commentsData: Commentt[] = await commentsRes.data.metadata;

    // Pass data to the page via props
    return { props: { blogData, sectionData, commentsData } };
  } catch (error) {
    console.error("Error fetching:", error);
    return {
      notFound: true,
    };
  }
};

IndexPage.getLayout = (page, props) => {
  return <>{page}</>;
};

export default IndexPage;
