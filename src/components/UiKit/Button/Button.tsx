import React, { FC } from "react";
import { ButtonProps, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import css from "./index.module.css";
import cn from "classnames";

type Props = {
  variant?: "primary" | "secondary" | "ghost" | "text";
  disabled?: boolean;
  showSpinner?: boolean;
} & Omit<ButtonProps, "type">;

const Button: FC<Props> = ({
  variant,
  children,
  className,
  disabled,
  showSpinner,
  ...rest
}) => (
  <button
    className={cn(
      css.button,
      className,
      (disabled || showSpinner) && css.disabled,
      showSpinner && css.smallPadding,
      variant === "primary" && css.primary,
      variant === "secondary" && css.secondary,
      variant === "ghost" && css.ghost,
      variant === "text" && css.text
    )}
    disabled={disabled}
    {...rest}
  >
    {showSpinner ? (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 28 }} spin />} />
    ) : (
      <>{children}</>
    )}
  </button>
);

export default Button;
