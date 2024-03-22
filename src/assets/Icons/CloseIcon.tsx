import React, { FC } from "react";
import css from "./index.module.css";

const CloseIcon: FC = () => (
  <div className={css.closeIconContainer}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8.85171L5.01901 11.8327C4.90748 11.9442 4.76553 12 4.59316 12C4.42079 12 4.27883 11.9442 4.1673 11.8327C4.05577 11.7212 4 11.5792 4 11.4068C4 11.2345 4.05577 11.0925 4.1673 10.981L7.14829 8L4.1673 5.01901C4.05577 4.90748 4 4.76553 4 4.59316C4 4.42079 4.05577 4.27883 4.1673 4.1673C4.27883 4.05577 4.42079 4 4.59316 4C4.76553 4 4.90748 4.05577 5.01901 4.1673L8 7.14829L10.981 4.1673C11.0925 4.05577 11.2345 4 11.4068 4C11.5792 4 11.7212 4.05577 11.8327 4.1673C11.9442 4.27883 12 4.42079 12 4.59316C12 4.76553 11.9442 4.90748 11.8327 5.01901L8.85171 8L11.8327 10.981C11.9442 11.0925 12 11.2345 12 11.4068C12 11.5792 11.9442 11.7212 11.8327 11.8327C11.7212 11.9442 11.5792 12 11.4068 12C11.2345 12 11.0925 11.9442 10.981 11.8327L8 8.85171Z"
        fill="#7A7A7A"
      />
    </svg>
  </div>
);

export default CloseIcon;
