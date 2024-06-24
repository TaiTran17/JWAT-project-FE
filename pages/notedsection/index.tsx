import Blog from "@/pages/components/Post/blog";
import Comment from "@/pages/components/Post/comment";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import nookies, { parseCookies } from "nookies";
import NoteSectionComponent from "@/pages/components/noteSection";

interface IndexPageProps {
  sectionData: Section[];
}

const IndexPage: NextPage<IndexPageProps> & {
  getLayout?: (page: JSX.Element, props: IndexPageProps) => JSX.Element;
} = ({ sectionData }) => {
  const [page, setPage] = useState(1);
  const [notedSectionss, setNotedSections] = useState(sectionData);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:3000/note?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parseCookies().Authorization}`,
        },
      });

      if (response.ok) {
        const newNotedSections = await response.json();

        setNotedSections(newNotedSections.map((item: any) => item.section));
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <>
      <NoteSectionComponent
        notedSections={notedSectionss}
        page={page}
        setPage={setPage}
      ></NoteSectionComponent>
    </>
  );
};

IndexPage.getLayout = (page, props) => {
  return <>{page}</>;
};

export default IndexPage;

// This function gets called on every request
export const getServerSideProps = async (context: any) => {
  const page = 1;

  const { Authorization } = parseCookies(context);

  // Fetch section data
  const sectionRes = await fetch(`http://localhost:3000/note?page=${page}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${Authorization}` },
  });

  if (!sectionRes.ok) {
    console.error("Failed to fetch section data:", sectionRes.statusText);
    throw new Error("Failed to fetch section data");
  }

  const sections: Section[] = await sectionRes.json();
  const sectionData = sections.map((item: any) => item.section);

  // Pass data to the page via props
  return { props: { sectionData } };
};
