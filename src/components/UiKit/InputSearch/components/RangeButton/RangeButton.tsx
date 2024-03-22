import React, { FC } from "react";
import Button from "../../../Button/Button";
import cn from "classnames";
import css from "./index.module.css";

type Props = {
  range: number;
  selectedRange: number;
  onClick: (value: number) => void;
};

const RangeButton: FC<Props> = ({ range, selectedRange, onClick }) => (
  <Button
    onClick={(e) => {
      e.preventDefault();
      onClick(range);
    }}
    className={cn(
      css.rangeBtn,
      selectedRange === range ? css.rangePrimary : css.rangeSecondary
    )}
  >
    {`${range}${selectedRange !== range ? " км" : ""}`}
  </Button>
);

export default RangeButton;
