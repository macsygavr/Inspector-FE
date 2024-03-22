import React, { FC, useState } from "react";
import css from "./index.module.css";
import { Tag } from "antd";
import { FieldInputProps } from "react-final-form";

const { CheckableTag } = Tag;

type Props = {
  tagsData: string[];
  initialSelected?: string[];
  singleMode?: boolean;
} & Partial<FieldInputProps<any, HTMLElement>>;

const Chips: FC<Props> = ({
  tagsData,
  initialSelected,
  singleMode,
  ...props
}) => {
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...props.value, tag]
      : props.value.filter((t: string) => t !== tag);
    if (props.onChange) {
      props.onChange(nextSelectedTags);
    }
  };

  const handleChangeSingleMode = (tag: string) => {
    if (props.onChange) {
      props.onChange([tag]);
    }
  };

  return (
    <>
      {tagsData?.map((tag) => (
        <CheckableTag
          key={tag}
          className={css.chips}
          checked={props.value.includes(tag)}
          onChange={(checked) => {
            singleMode
              ? handleChangeSingleMode(tag)
              : handleChange(tag, checked);
          }}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  );
};

export default Chips;
