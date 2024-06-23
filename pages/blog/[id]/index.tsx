import Blog from "@/pages/components/Post/blog";
import Comment from "@/pages/components/Post/comment";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { parseCookies } from "nookies";
import SectionComponent from "@/pages/components/Post/section";

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
      <SectionComponent
        blogId={blogData.id}
        sectionData={sectionData}
      ></SectionComponent>
      <Comment blog_id={blogData.id} initialComments={commentsData}></Comment>
    </>
  );
};

// This function gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params; // Assuming 'id' is part of context.params
  const { Authorization } = parseCookies(context);

  // Fetch blog data
  const blogRes = await fetch(
    `http://localhost:3000/blog/getbyBlogId?blog_id=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    }
  );
  const blogData: BlogData = await blogRes.json();

  // Fetch section data
  const sectionRes = await fetch(
    `http://localhost:3000/section?blog_id=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    }
  );

  if (!sectionRes.ok) {
    console.error("Failed to fetch section data:", sectionRes.statusText);
    throw new Error("Failed to fetch section data");
  }

  const sectionData: Section[] = await sectionRes.json();

  // Fetch comments data
  const commentsRes = await fetch(
    `http://localhost:3000/comment/getbyblog?blog_id=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    }
  );

  if (!commentsRes.ok) {
    console.error("Failed to fetch comments data:", commentsRes.statusText);
    throw new Error("Failed to fetch comments data");
  }

  const commentsData: Commentt[] = await commentsRes.json();

  // Pass data to the page via props
  return { props: { blogData, sectionData, commentsData } };
};

IndexPage.getLayout = (page, props) => {
  return <>{page}</>;
};

export default IndexPage;
