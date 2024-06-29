import React, { useRef, useState } from "react";

interface IModalProps {
  user: User;
  handleFunction: () => void;
}

const UserList: React.FC<IModalProps> = ({ user, handleFunction }) => {
  return (
    <>
      <div onClick={handleFunction} color="black">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user.avatar} alt="Avatar " />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.username}</div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="text-sm opacity-50">Role</div>
                  <div className="font-bold">{user.role}</div>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs text-base">Add</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
