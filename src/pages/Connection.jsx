import React from "react";

const Connection = () => {
  return (
    <div>
      <h2 className="text-center font-bold text-3xl mt-5">Connections</h2>
      <ul className="list bg-base-100 rounded-box shadow-md max-w-lg mx-auto mt-5">
        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Connection;
