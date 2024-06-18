import Navbar from "@/pages/components/Navbar";
import PostList from "@/pages/components/PostList";
import UserInfo from "@/pages/components/UserInfo";
import { NextPage } from "next";
import { getBlog } from "@/pages/actions/userAction";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  return (
    <>
      <PostList type={"team"} />
    </>
  );
};

IndexPage.getLayout = true;

export default IndexPage;
