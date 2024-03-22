import React, { FC, ReactNode, useState } from "react";
import css from "./index.module.css";
import ProgressBar, {
  ProgressLevel,
  smallProgressTitleList,
} from "../ProgressBar/ProgressBar";
import Tooltip from "../../../../../../components/UiKit/Tooltip/Tooltip";
import TooltipOnIcon from "../../../../../../assets/Icons/TooltipOnIcon";
import TooltipOffIcon from "../../../../../../assets/Icons/TooltipOffIcon";

type Props = {
  title: string;
  level: ProgressLevel;
  levelNumber?: number | null;
  tooltipTitle: string;
  tooltipContent: string | ReactNode;
};

const ReportInfrastructureRow: FC<Props> = ({
  title,
  level,
  levelNumber,
  tooltipTitle,
  tooltipContent,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <div>
          <span className={css.title}>{title}</span>
          &nbsp;
          <span className={css.grade}>
            {`(${smallProgressTitleList[level]})`}{" "}
          </span>
        </div>
        <Tooltip
          afterOpenChange={(visible) => setIsOpen(visible)}
          title={tooltipTitle}
          content={tooltipContent}
        >
          <div className={css.tooltipIcon}>
            {isOpen ? <TooltipOnIcon /> : <TooltipOffIcon />}
          </div>
        </Tooltip>
      </div>
      <div className={css.progressBarContainer}>
        <ProgressBar size="small" level={level} levelNumber={levelNumber} />
      </div>
    </div>
  );
};

export default ReportInfrastructureRow;
