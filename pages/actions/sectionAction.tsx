import Blog from "@/pages/components/Post/blog";
import Section from "@/pages/components/Post/section";
import Comment from "@/pages/components/Post/comment";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { parseCookies } from "nookies";

interface IndexPageProps {
  blogData: BlogData;
  sectionData: Section;
}

const IndexPage: NextPage<IndexPageProps> & {
  getLayout?: (page: JSX.Element, props: IndexPageProps) => JSX.Element;
} = ({ blogData, sectionData }) => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Blog blogData={blogData}></Blog>
      <Section sectionData={sectionData}></Section>
      {/* <Comment blog_id={blogData.id}></Comment> */}
    </>
  );
};

// This function gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
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

  // Fetch sections data
  const sectionRes = await fetch(
    `http://localhost:3000/section?blog_id=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    }
  );
  const sectionData: SectionData[] = await sectionRes.json();

  // Pass data to the page via props
  return { props: { blogData, sectionData } };
};

IndexPage.getLayout = (page, props) => {
  return <>{page}</>;
};
export default IndexPage;
