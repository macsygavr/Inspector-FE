import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";

type Props = {
  title: string;
  value: string;
};

const CharacteristicsRow: FC<Props> = ({ title, value }) => {
  return (
    <div className={css.container}>
      <span className={cn(css.text, css.title)}>{title}</span>
      <span className={cn(css.text, css.value)}>{value}</span>
    </div>
  );
};

export default CharacteristicsRow;
