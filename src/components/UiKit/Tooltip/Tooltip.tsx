import { Popover, PopoverProps } from "antd";
import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";

const Tooltip: FC<PopoverProps> = ({ children, className, ...rest }) => (
  <Popover overlayClassName={cn(css.customPopover, className)} {...rest}>
    {children}
  </Popover>
);

export default Tooltip;
