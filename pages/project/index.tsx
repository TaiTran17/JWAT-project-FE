import PostList from "@/pages/components/PostList";
import { NextPage } from "next";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  return (
    <>
      <PostList type={"project"} />
    </>
  );
};

IndexPage.getLayout = true;

export default IndexPage;
