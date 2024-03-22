import React, { FC } from "react";
import { Pagination as AntdPagination, PaginationProps } from "antd";
import css from "./index.module.css";
import { itemRender } from "./helpers";

type Props = PaginationProps;

const Pagination: FC<Props> = ({ ...props }) => (
  <div className={css.container}>
    <AntdPagination {...props} itemRender={itemRender} />
  </div>
);

export default Pagination;
