import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";
import { RequestStatusTag } from "./components/RequestStatusTag/RequestStatusTag";
import Button from "../../../../../../components/UiKit/Button/Button";
import WarningRedIcon from "../../../../../../assets/Icons/WarningRedIcon";
import useCustomMediaQuery from "../../../../../../hooks/useCustomMediaQuery";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../../../../../routes";

export enum RequestStatusEnum {
  MODERATION = "MODERATION",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

export type RequestRowType = {
  id: string;
  date: string;
  status: RequestStatusEnum;
  url: string;
  reason: string;
};

const RequestRow: FC<RequestRowType> = ({ id, date, status, url, reason }) => {
  const router = useRouter();
  const isMobile = useCustomMediaQuery("(max-width: 636px)");

  const handleWatchReportClick = () => router.push(PublicRoutes.REPORT.get(id));

  return (
    <div>
      {status === RequestStatusEnum.REJECTED && reason && (
        <div className={css.error}>
          <div className={css.iconContainer}>
            <WarningRedIcon />
          </div>
          <span className={css.errorText}>
            {reason}
          </span>
        </div>
      )}
      {isMobile ? (
        <div
          className={cn(
            css.container,
            css.flexContainer,
            status === RequestStatusEnum.REJECTED && reason && css.reject
          )}
        >
          <div className={css.dateStatusRow}>
            <div className={cn(css.item, css.date)}>{date}</div>
            <div className={cn(css.item, css.status)}>
              <RequestStatusTag status={status} />
            </div>
          </div>
          <div className={cn(css.item, css.urlContainer)}>
            <a className={css.url} href={url} target="_blank">
              {url}
            </a>
          </div>
          {status === RequestStatusEnum.COMPLETED && (
            <div className={css.item}>
              <Button
                onClick={handleWatchReportClick}
                className={css.button}
                variant="secondary"
              >
                Смотреть отчет
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          className={cn(
            css.container,
            css.gridContainer,
            status === RequestStatusEnum.REJECTED && reason && css.reject
          )}
        >
          <div className={cn(css.item, css.date)}>{date}</div>
          <div className={cn(css.item, css.status)}>
            <RequestStatusTag status={status} />
          </div>
          <div className={cn(css.item, css.urlContainer)}>
            <a className={css.url} href={url} target="_blank">
              {url}
            </a>
          </div>
          {status === RequestStatusEnum.COMPLETED && (
            <div className={css.item}>
              <Button onClick={handleWatchReportClick} variant="secondary">
                Смотреть отчет
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestRow;
