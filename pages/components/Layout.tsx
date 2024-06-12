import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionContainer from "../components/SectionContainer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-xl items-center justify-center  w-full">
        <Navbar />
      </div>
      <SectionContainer>
        <div className="min-h-screen flex-col justify-between font-sans">
          {/* <SearchProvider searchConfig={siteMetadata.search as SearchConfig}> */}
          <main className="mb-auto">{children}</main>
          {/* </SearchProvider> */}
          <Footer />
        </div>
      </SectionContainer>
    </>
  );
};

export default Layout;
