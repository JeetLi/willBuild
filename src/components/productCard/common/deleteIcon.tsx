import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useState } from "react";

type DeleteIconProps = {
  removeItem: () => void;
};

const DeleteIcon: React.FC<DeleteIconProps> = ({ removeItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={removeItem}
      className="deleteIcon"
      style={{
        width: "26px",
        height: "26px",
        position: "absolute",
        right: "10px",
        top: "10px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="26" height="26" fill="#FF781F" />
          <path
            d="M20.3125 5.6875L5.6875 20.3125"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.3125 20.3125L5.6875 5.6875"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="26" height="26" fill="#A8A8A8" />
          <path
            d="M20.3125 5.6875L5.6875 20.3125"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.3125 20.3125L5.6875 5.6875"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default DeleteIcon;
