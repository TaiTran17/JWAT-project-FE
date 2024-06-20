import Blog from "@/pages/components/Post/blog";
import BlogHeader from "@/pages/components/BlogHeader";
import Navbar from "@/pages/components/Navbar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Section from "@/pages/components/Post/section";
import Comment from "@/pages/components/Post/comment";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  const router = useRouter();

  const { id } = router.query;
  if (id) {
    return (
      <>
        <Blog blog_id={`${id}`}></Blog>
        <Section blog_id={`${id}`}></Section>
        <Comment blog_id={`${id}`}></Comment>
      </>
    );
  }
};

IndexPage.getLayout = true;

export default IndexPage;
