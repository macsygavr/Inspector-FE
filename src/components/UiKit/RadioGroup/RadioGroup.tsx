import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";
import { FieldInputProps } from "react-final-form";

type Props = {
  groupName: string;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
  rowClassName?: string;
  initialValue?: string;
  onClick: (value: string) => void;
} & Partial<FieldInputProps<any, HTMLElement>>;

const RadioGroup: FC<Props> = ({
  groupName,
  options,
  className,
  rowClassName,
  initialValue,
  onClick,
  ...props
}) => {
  return (
    <div className={cn(css.container, className)}>
      {options?.map((item, index) => {
        const isChecked = item.value === initialValue;

        return (
          <div
            key={`${item.value}${index}`}
            className={cn(css.inputContainer, rowClassName)}
          >
            <input
              {...props}
              checked={isChecked}
              key={`${index}${item.value}`}
              name={groupName}
              type="radio"
              value={item.value}
              id={item.value}
              className={css.input}
              onClick={() => onClick(item.value)}
              onChange={() => onClick(item.value)}
            />
            <label htmlFor={item.value} className={css.label}>
              {item.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioGroup;
