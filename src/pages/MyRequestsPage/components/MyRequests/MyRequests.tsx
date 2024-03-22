import React, { FC, useEffect, useState } from "react";
import css from "./index.module.css";
import cn from "classnames";
import RequestRow, {
  RequestRowType,
  RequestStatusEnum,
} from "./components/RequestRow/RequestRow";
import InfoIcon from "../../../../assets/Icons/InfoIcon";
import useCustomMediaQuery from "../../../../hooks/useCustomMediaQuery";
import MakeRequestButton from "../../../../components/MakeRequestButton/MakeRequestButton";
import SortPopup, { SortEnum } from "../SortPopup/SortPopup";
import { formatDate } from "../../../../lib/formatters/dateFromatters";

type Props = {
  requests: RequestRowType[];
};

const MyRequests: FC<Props> = ({ requests }) => {
  const [sortValue, setSortValue] = useState(SortEnum.New);
  const [sortedRequests, setSortedRequests] = useState<RequestRowType[]>([]);

  const isMobile = useCustomMediaQuery("(max-width: 636px)");
  const hasActiveRequest = requests.some(
    (item) =>
      item.status === RequestStatusEnum.MODERATION ||
      item.status === RequestStatusEnum.INPROGRESS
  );

  const handleSetSort = (value: SortEnum) => {
    setSortValue(value);
  };

  useEffect(() => {
    const sorted = [
      ...requests.sort((a, b) => {
        return sortValue === SortEnum.New
          ? new Date(a.date).valueOf() - new Date(b.date).valueOf()
          : new Date(b.date).valueOf() - new Date(a.date).valueOf();
      }),
    ];
    setSortedRequests(sorted);
  }, [sortValue, requests]);

  return (
    <div className={css.container}>
      <div className={css.title}>Мои заявки</div>
      {!isMobile ? (
        <div className={css.columnsTitleContainer}>
          <div className={cn(css.columnTitle, css.date)}>Дата подачи</div>
          <div className={cn(css.columnTitle, css.status)}>Статус заявки</div>
          <div className={css.columnTitle}>Ссылка на источник</div>
          <SortPopup value={sortValue} setValue={handleSetSort} />
        </div>
      ) : (
        <SortPopup value={sortValue} setValue={handleSetSort} />
      )}
      <div className={css.rowsContainer}>
        {sortedRequests?.map((item, index) => (
          <RequestRow
            key={`${item.id}-${index}`}
            id={item.id}
            date={formatDate(item.date)}
            status={item.status}
            url={item.url}
            reason={item.reason}
          />
        ))}
      </div>
      {hasActiveRequest ? (
        <div className={css.infoContainer}>
          <div className={css.iconContainer}>
            <InfoIcon />
          </div>
          <span className={css.infoText}>
            Проверка нового объекта будет доступна после завершения активной
            заявки
          </span>
        </div>
      ) : (
        <div className={css.makeRequestBtnContainer}>
          <MakeRequestButton
            variant="primary"
            className={css.btn}
            customText="Проверить новый объект"
          />
        </div>
      )}
    </div>
  );
};

export default MyRequests;
