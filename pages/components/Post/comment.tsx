import { addComment, getCommentsByBlogId } from "@/pages/actions/commentAction";
import { getUserInfo } from "@/pages/actions/userAction";
import { useEffect, useState } from "react";

function formatDate(dateString: string, locale: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(locale);
}
const siteMetadata = {
  locale: "en-US",
};

interface CommentProps {
  blog_id: string;
}

export default function Comment({ blog_id }: CommentProps) {
  const [comments, setComments] = useState<Commentt[]>();
  const [userInfos, setUserInfos] = useState<{ [key: string]: User }>({});
  const [newComment, setNewComment] = useState<string>("");

  const fetchComments = async () => {
    try {
      const response = await getCommentsByBlogId(blog_id);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchUserInfo = async (user_id: string) => {
    try {
      const response = await getUserInfo(user_id);
      const userInfo = response.data;
      setUserInfos((prevUserInfos) => ({
        ...prevUserInfos,
        [user_id]: userInfo,
      }));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blog_id]);

  useEffect(() => {
    commentsList.forEach((comment) => {
      if (!userInfos[comment.createdBy]) {
        fetchUserInfo(comment.createdBy);
      }
    });
  }, [comments]);

  const handleAddComment = async () => {
    try {
      const tmpComment = { blog: blog_id, comment: newComment };
      await addComment(tmpComment);
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const commentsList = Array.isArray(comments) ? comments : [];
  return (
    <ul className="bg-base-200 p-4 rounded-xl mt-10 ">
      {!commentsList.length && "No comments found."}
      {commentsList.map((commentt) => {
        const { comment, createdBy, createdAt } = commentt;
        const userInfo = userInfos[createdBy];
        return (
          <li className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={userInfo?.avatar}
                />
              </div>
            </div>
            <div className="chat-header">
              {userInfo?.username}
              <time dateTime={createdAt} className="text-xs opacity-50">
                {formatDate(createdAt, siteMetadata.locale)}
              </time>
            </div>
            <div className="chat-bubble">{comment}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </li>
        );
      })}
      <div className="bg-base-200 p-4 rounded-xl mt-10">
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Enter your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>

      <div className="max-w-4xl px-10 py-16 mx-auto bg-gray-100  bg-white min-w-screen animation-fade animation-delay  px-0 px-8 mx-auto sm:px-12 xl:px-5">
        <p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
          All comments on this post
        </p>
        <div className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <a href="#" className="flex items-center mt-6 mb-6 mr-6">
            <img
              src="https://avatars.githubusercontent.com/u/71964085?v=4"
              alt="avatar"
              className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
            />
          </a>

          <div>
            <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
              By James Amos
            </h3>
            <p className="text-sm font-bold text-gray-300">August 22,2021</p>
            <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
              Please help with how you did the migrations for the blog database
              fields.I tried mine using exactly what you instructed but its not
              working!!.
            </p>
          </div>
        </div>
        <div className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <a href="#" className="flex items-center mt-6 mb-6 mr-6">
            <img
              src="https://avatars.githubusercontent.com/u/71964085?v=4"
              alt="avatar"
              className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
            />
          </a>

          <div>
            <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
              By James Amos
            </h3>
            <p className="text-sm font-bold text-gray-300">August 22,2021</p>
            <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
              Especially I dont understand the concepts of multiple models.What
              really is the difference between the blog model and blogApp model?
              Am stuck
            </p>
          </div>
        </div>
      </div>
    </ul>
  );
}
