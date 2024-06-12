import siteMetadata from "../util/siteMetadata";
import Image from "next/image";
import avatar from "../util/tải xuống.png";
import Link from "next/link";

export default function UserInfo() {
  return (
    <div className=" flex gap-10 space-y-2 pb-8 pt-6 md:space-y-5 items-center justify-center ">
      <div className="animate-fadeIn">
        <Image
          src={avatar}
          alt="Avatar"
          width={200}
          height={100}
          className="rounded-full "
        />
      </div>

      <div className="flex flex-col gap-8 animate-fadeIn ">
        <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Welcome Tai Tran
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>

        <Link href="/post-detail">
          {/* <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> */}
          Go to Post Detail
          {/* </a> */}
        </Link>
      </div>
    </div>
  );
}
