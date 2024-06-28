import Blog from "@/src/components/Post/blog";
import Comment from "@/src/components/Post/comment";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import nookies, { parseCookies } from "nookies";
import NoteSectionComponent from "@/src/components/noteSection";
import api from "@/src/util/lib/axiosClient";

interface IndexPageProps {
  sectionData: Section[];
}

const IndexPage: NextPage<IndexPageProps> & {
  getLayout?: (page: JSX.Element, props: IndexPageProps) => JSX.Element;
} = ({ sectionData }) => {
  const [page, setPage] = useState(1);
  const [notedSectionss, setNotedSections] = useState(sectionData);

  const fetchSections = useCallback(async () => {
    const response = await api.get(`note?page=${page}`);

    if (response.data) {
      setNotedSections(response.data.metadata.map((item: any) => item.section));
    }
  }, [page]);

  useEffect(() => {
    fetchSections();
  }, [page, fetchSections]);

  return (
    <>
      <NoteSectionComponent
        notedSections={notedSectionss}
        page={page}
        setPage={setPage}
        fetchSections={fetchSections}
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

  const cookies = nookies.get(context);
  const token = cookies.Authorization || "";

  // Fetch section data
  try {
    const sectionRes = await api.get(`/note?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!sectionRes.data) {
      console.error("Failed to fetch section data:", sectionRes.statusText);
      throw new Error("Failed to fetch section data");
    }

    const sectionData = sectionRes.data.metadata.map(
      (item: any) => item.section
    );

    // Pass data to the page via props
    return { props: { sectionData } };
  } catch (error) {
    console.error("Error fetching:", error);
    return {
      notFound: true,
    };
  }
};
