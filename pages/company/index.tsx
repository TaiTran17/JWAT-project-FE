import Navbar from "@/pages/components/Navbar";
import PostList from "@/pages/components/PostList";
import UserInfo from "@/pages/components/UserInfo";
import { NextPage } from "next";

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  return (
    <>
      <img
        src="https://res.cloudinary.com/de22izcfb/image/upload/v1718901225/nwsftsfza8q2io6omgja.png"
        alt="background"
      />
      <PostList type={"company"} />
    </>
  );
};

IndexPage.getLayout = true;

export default IndexPage;
