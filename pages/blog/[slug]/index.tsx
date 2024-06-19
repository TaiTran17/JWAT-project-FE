import Blog from "@/pages/components/Post/blog";
import BlogHeader from "@/pages/components/BlogHeader";
import Navbar from "@/pages/components/Navbar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Section from "@/pages/components/Post/section";
import Comment from "@/pages/components/Post/comment";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <Blog blog_id={`${slug}`}></Blog>
      <Section blog_id={`${slug}`}></Section>
      <Comment blog_id={`${slug}`}></Comment>
    </>
  );
};

IndexPage.getLayout = true;

export default IndexPage;
