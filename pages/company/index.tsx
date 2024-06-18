import Navbar from "@/pages/components/Navbar";
import PostList from "@/pages/components/PostList";
import UserInfo from "@/pages/components/UserInfo";
import { NextPage } from "next";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  return (
    <>
      <UserInfo />
      <PostList type={"company"} />
    </>
  );
};

IndexPage.getLayout = true;

export default IndexPage;
