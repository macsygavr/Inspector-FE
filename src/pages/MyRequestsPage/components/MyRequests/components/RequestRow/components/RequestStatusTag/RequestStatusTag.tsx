import React, { FC } from "react";
import css from "./index.module.css";
import { RequestStatusEnum } from "../../RequestRow";
import { getStatusName } from "./helpers";

const classNameList: { [key in RequestStatusEnum]: string } = {
  "MODERATION": css.blue,
  "INPROGRESS": css.yellow,
  "COMPLETED": css.green,
  "REJECTED": css.red,
};

type Props = {
  status: RequestStatusEnum;
};

export const RequestStatusTag: FC<Props> = ({ status }) => {
  return (
    <div className={css.statusTag}>
      <span className={classNameList[status]}>{getStatusName(status)}</span>
    </div>
  );
};
