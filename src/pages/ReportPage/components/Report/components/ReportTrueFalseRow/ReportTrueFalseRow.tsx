import React, { FC } from "react";
import css from "./index.module.css";
import CheckMarkIcon from "../../../../../../assets/Icons/CheckMarkIcon";
import WarningIcon from "../../../../../../assets/Icons/WarningIcon";
import cn from "classnames";
import CheckMarkGhost from "../../../../../../assets/Icons/CheckMarkGhost";

type Props = {
  title: string;
  value?: boolean;
};

const ReportTrueFalseRow: FC<Props> = ({ title, value }) => (
  <div className={css.container}>
    <div className={css.titleContainer}>
      <span className={cn(css.title, value ?? css.unknown)}>{title}</span>
    </div>
    {value === true ? (
      <div className={css.valueText}>
        Да <WarningIcon />
      </div>
    ) : value === false ? (
      <div className={css.valueText}>
        Нет <CheckMarkIcon />
      </div>
    ) : (
      <div className={css.valueText}>
        <span className={css.valueTitle}>Не указано</span>
        <div className={css.unknownBackground}>
          <CheckMarkGhost />
        </div>
      </div>
    )}
  </div>
);

export default ReportTrueFalseRow;
