import {
  addComment,
  getCommentsByBlogId,
} from "@/src/util/actions/commentAction";
import { useUserStore } from "@/src/util/store/userStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { debounce } from "lodash";

function formatDate(dateString: string, locale: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(locale);
}

const siteMetadata = {
  locale: "en-US",
};

interface CommentProps {
  initialComments: Commentt[];
}

export default function Comment({ initialComments }: CommentProps) {
  const [comments, setComments] = useState<Commentt[]>(initialComments || []);
  const [newComment, setNewComment] = useState<string>("");
  const [visibleComments, setVisibleComments] = useState<number>(10);

  const { user, fetchUser } = useUserStore((state) => ({
    user: state.user,
    fetchUser: state.fetchUser,
  }));

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  useEffect(() => {
    const socket = io("http://localhost:3000", { transports: ["websocket"] });
    socket.on("newComment", (newComment: Commentt) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAddComment = debounce(async () => {
    try {
      if (!newComment.trim()) {
        toast.error("Please enter a comment.");
        return;
      }

      const blog_id = initialComments[0].blog.id;
      const tmpComment = { blog: blog_id, comment: newComment, user: user };
      await addComment(tmpComment);
      setNewComment("");
      toast.success("Comment added successfully.");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }, 300); // Debounce with 300ms delay

  const handleLoadMore = debounce(() => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 10);
  }, 300); // Debounce with 300ms delay

  return (
    <>
      <p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
        All comments for this memory
      </p>
      <ul className="bg-base-200 p-4 rounded-xl mt-10">
        {!comments.length && "No comments found."}
        {comments.slice(0, visibleComments).map((commentt) => {
          const { id, comment, createdAt, user } = commentt;

          return (
            <li className={`chat chat-start ml-6 mt-2`} key={id}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  {user?.avatar ? (
                    <img alt="Avatar" src={user.avatar} />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  )}
                </div>
              </div>
              <div className="chat-header ml-2 mb-1">
                {user?.username}
                <time dateTime={createdAt} className="text-xs opacity-50 ml-3">
                  {formatDate(createdAt, siteMetadata.locale)}
                </time>
              </div>
              <div className="chat-bubble">{comment}</div>
            </li>
          );
        })}
        {visibleComments < comments.length && (
          <button className="mt-10" onClick={handleLoadMore}>
            Load More
          </button>
        )}
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
    </>
  );
}
