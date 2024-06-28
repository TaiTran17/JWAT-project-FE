import React, { useRef, useState } from "react";

interface IModalProps {
  user: User;
  handleFunction: () => void;
}

const UserList: React.FC<IModalProps> = ({ user, handleFunction }) => {
  return (
    <>
      <div onClick={handleFunction} color="black">
        <img
          className="w-8 h-8 rounded-full object-cover"
          title="User Profile Pic"
          src={user.avatar}
        />
        <div>
          {user.username}
          Role : {user.role}
        </div>
      </div>
    </>
  );
};

export default UserList;
