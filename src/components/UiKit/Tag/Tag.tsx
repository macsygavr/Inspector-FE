import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";
import { getTagCountText } from "./helpers";

export enum TagEnum {
  ObjectSold = "ObjectSold",
  ReadyToTrade = "ReadyToTrade",
  ResidentialComplexProblem = "ResidentialComplexProblem",
  ApartmentProblem = "ApartmentProblem",
  Empty = "Empty",
}

const tagTitleList: { [key in TagEnum]: string } = {
  [TagEnum.ObjectSold]: "Объект продан",
  [TagEnum.ReadyToTrade]: "Готовы к торгу",
  [TagEnum.ResidentialComplexProblem]: " с ЖК",
  [TagEnum.ApartmentProblem]: " с квартирой",
  [TagEnum.Empty]: "",
};

const classNameList: { [key in TagEnum]: string } = {
  [TagEnum.ObjectSold]: css.green,
  [TagEnum.ReadyToTrade]: css.green,
  [TagEnum.ApartmentProblem]: css.orange,
  [TagEnum.ResidentialComplexProblem]: css.orange,
  [TagEnum.Empty]: css.orange,
};

type Props = {
  tag: TagEnum;
  size?: "small" | "big";
  countInText?: number;
  className?: string;
  customText?: string;
};

const Tag: FC<Props> = ({
  tag,
  size = "big",
  countInText,
  className,
  customText,
}) => {
  return (
    <div
      className={cn(
        css.tag,
        classNameList[tag],
        size === "small" && css.small,
        className
      )}
    >
      {`${countInText ?? ""} ${getTagCountText(countInText)}`}
      {customText}
      {tagTitleList[tag]}
    </div>
  );
};

export default Tag;
