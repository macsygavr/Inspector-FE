import React, { FC } from "react";
import css from './index.module.css'

const DropDownIcon: FC = () => (
  <div className={css.dropUpAndDownIconContainer}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6L8 11L13 6"
        stroke="#7A7A7A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default DropDownIcon;
