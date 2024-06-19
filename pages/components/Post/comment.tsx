import { getCommentsByBlogId, getUserInfo } from "@/pages/actions/userAction";
import { useEffect, useState } from "react";

interface CommentProps {
  blog_id: string;
}

export default function Comment({ blog_id }: CommentProps) {
  const [comments, setComments] = useState<Commentt[]>();
  const [userInfos, setUserInfos] = useState<{ [key: string]: User }>({});

  //   const [userInfo, setUserInfo] = useState<User>();

  // const fetchBlog = async () => {
  //   setPosts((await getBlog(type, page)).data); // Update the return type of getBlog
  // };

  const fetchComments = async () => {
    try {
      const response = await getCommentsByBlogId(blog_id);
      setComments(response.data); // Cập nhật kiểu trả về của getBlog nếu cần
      // console.log(response.data);
      // console.log("Page", page);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  //   const fetchUserInfo = async (user_id: string) => {
  //     try {
  //       const response = await getUserInfo(user_id);
  //       setUserInfo(response.data); // Cập nhật kiểu trả về của getBlog nếu cần
  //     } catch (error) {
  //       console.error("Error fetching blog:", error);
  //     }
  //   };
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
              <time className="text-xs opacity-50">{createdAt}</time>
            </div>
            <div className="chat-bubble">{comment}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </li>
        );
      })}
    </ul>
  );
}
