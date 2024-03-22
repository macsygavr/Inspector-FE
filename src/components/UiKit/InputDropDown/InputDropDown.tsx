import { Select } from "antd";
import React, { FC, useState } from "react";
import css from "./index.module.css";
import DropDownIcon from "../../../assets/Icons/DropDownIcon";
import DropUpIcon from "../../../assets/Icons/DropUpIcon";
import { FieldInputProps } from "react-final-form";

type InputDropDownOptions = {
  value: string;
  label: string;
}[];

type Props = {
  label?: string;
  options: InputDropDownOptions;
  value?: string[];
  placeholder?: string;
} & Partial<FieldInputProps<any, HTMLElement>>;

const InputDropDown: FC<Props> = ({
  label,
  options,
  value,
  placeholder,
  ...props
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={css.container}>
      {label && <div className={css.label}>{label}</div>}
      <Select
        {...props}
        onDropdownVisibleChange={(open) => setIsPopupOpen(open)}
        suffixIcon={isPopupOpen ? <DropUpIcon /> : <DropDownIcon />}
        options={options}
        className={css.customSelect}
        popupClassName={css.customPopup}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        placeholder={placeholder ?? "Выберите"}
        mode="multiple"
        showSearch={false}
        value={value}
      />
    </div>
  );
};

export default InputDropDown;
