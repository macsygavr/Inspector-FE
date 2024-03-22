import React, { FC, PropsWithChildren, ReactNode, useState } from "react";
import css from "./index.module.css";
import Tooltip from "../../../../../../components/UiKit/Tooltip/Tooltip";
import TooltipOffIcon from "../../../../../../assets/Icons/TooltipOffIcon";
import TooltipOnIcon from "../../../../../../assets/Icons/TooltipOnIcon";

type Props = {
  title: string;
  withTooltip?: boolean;
  tooltipTitle?: string;
  tooltipContent?: string | ReactNode;
} & PropsWithChildren;

const ReportBlock: FC<Props> = ({
  title,
  withTooltip,
  tooltipTitle,
  tooltipContent,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={css.block}>
      <span className={css.blockTitle}>
        {title}
        {withTooltip && (
          <Tooltip
            afterOpenChange={(visible) => setIsOpen(visible)}
            title={tooltipTitle}
            content={tooltipContent}
          >
            <div className={css.tooltipIcon}>
              {isOpen ? <TooltipOnIcon /> : <TooltipOffIcon />}
            </div>
          </Tooltip>
        )}
      </span>
      {children}
    </div>
  );
};

export default ReportBlock;
