import React, { FC } from "react";
import css from "./index.module.css";
import { Input } from "antd";
import { FieldInputProps } from "react-final-form";
import cn from "classnames";

type Props = {
  className?: string;
  placeholder?: string;
} & Partial<FieldInputProps<any, HTMLElement>>;

const InputField: FC<Props> = ({ placeholder, className, ...props }) => {
  return (
    <Input
      {...props}
      autoFocus={true}
      autoComplete="off"
      type="string"
      placeholder={placeholder ?? "Вставьте ссылку"}
      className={cn(css.customInput, className)}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          e.preventDefault();
        }
      }}
    />
  );
};

export default InputField;
