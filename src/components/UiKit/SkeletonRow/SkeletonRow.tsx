import { Skeleton, SkeletonProps } from "antd";
import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";

const SkeletonRow: FC<SkeletonProps> = ({ className, ...props }) => (
  <Skeleton
    {...props}
    active
    paragraph={false}
    className={cn(css.container, className)}
  />
);

export default SkeletonRow;
