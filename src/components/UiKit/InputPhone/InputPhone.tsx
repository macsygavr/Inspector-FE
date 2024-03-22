import React, { FC, useEffect, useState } from "react";
import css from "./index.module.css";
import cn from "classnames";
import CloseIcon from "../../../assets/Icons/CloseIcon";
import { FieldInputProps } from "react-final-form";
import InputMask from "react-input-mask";
import CheckMarkIconOutlined from "../../../assets/Icons/CheckMarkIconOutlined";
import { useQuery } from "react-query";
import { getPhone } from "../../../api/accountApi";

type Props = {
  className?: string;
  handleSubmit?: () => void;
  disableSubmit?: boolean;
} & Partial<FieldInputProps<any, HTMLElement>>;

const InputPhone: FC<Props> = ({
  className,
  handleSubmit,
  disableSubmit,
  ...props
}) => {
  const { data } = useQuery("userPhone", getPhone);

  const [inputValue, setInputValue] = useState("");
  const showCloseIcon = inputValue.length > 0 && inputValue.length < 16;
  const showCheckIcon = inputValue.length === 16;

  useEffect(() => {
    if (data?.phone) {
      setInputValue(data.phone);
    } else {
      setInputValue("");
    }
  }, [data]);

  return (
    <div className={css.inputContainer}>
      <InputMask
        className={cn(css.customInput, className)}
        {...props}
        autoFocus={true}
        type="tel"
        mask="+7 999 999-99-99"
        maskChar=""
        placeholder="+7 000 000-00-00"
        onChange={(e) => {
          setInputValue(e.target.value);
          props.onChange?.(e.target.value.replace(/[^0-9]/g, ""));
        }}
        value={inputValue}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            e.preventDefault();
          }
          if (e.code === "Enter" && handleSubmit && !disableSubmit) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className={css.iconContainer}>
        {showCloseIcon && (
          <div
            className={css.closeIconContainer}
            onClick={() => setInputValue("")}
          >
            <CloseIcon />
          </div>
        )}
        {showCheckIcon && <CheckMarkIconOutlined />}
      </div>
    </div>
  );
};

export default InputPhone;
