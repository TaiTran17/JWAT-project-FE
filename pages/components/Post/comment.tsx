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
          <li className="chat chat-start ml-6 mt-2">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={userInfo?.avatar}
                />
              </div>
            </div>
            <div className="chat-header ml-2 mb-1">
              {userInfo?.username}
              <time dateTime={createdAt} className="text-xs opacity-50 ml-3">
                {formatDate(createdAt, siteMetadata.locale)}
              </time>
            </div>
            <div className="chat-bubble">{comment}</div>
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
            className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </ul>
  );
}
