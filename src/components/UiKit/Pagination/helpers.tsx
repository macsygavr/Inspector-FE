import { PaginationProps } from "antd";
import css from './index.module.css';

export const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if(type === "jump-next" || type === "jump-prev") {
    return <span className={css.ellipsis}>...</span>
  }
  return originalElement;
};
