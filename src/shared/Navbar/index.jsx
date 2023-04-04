import React from "react";
import avatar from "../../assets/img/avatar.png";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className=" bg-[#e2edf5] py-4">
      <div className="navbar w-[90%] mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Hellwet Todo App</a>
        </div>
        <div className="flex-none">
          <h1 className="text-xl mr-3">{user.name}</h1>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-[100px] rounded-full">
                <img src={avatar} alrt="profile picture" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
