import React, { FC, ReactNode } from "react";
import css from "./index.module.css";
import cn from "classnames";

type Props = {
  icon: ReactNode;
  title: string;
  value: string;
  disabledText: boolean;
};

const ReportLegalAspectsRow: FC<Props> = ({
  icon,
  title,
  value,
  disabledText,
}) => {
  return (
    <div className={css.container}>
      <div>{icon}</div>
      <div className={css.textContainer}>
        <span className={css.title}>{title}</span>
        <span className={cn(css.value, disabledText && css.disabledText)}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default ReportLegalAspectsRow;
