import React, { FC, useEffect, useState } from "react";
import css from "../index.module.css";
import { Modal, ModalProps } from "antd";
import { Field, Form } from "react-final-form";
import cn from "classnames";
import ModalCloseIcon from "../../../assets/Icons/ModalCloseIcon";
import Button from "../../UiKit/Button/Button";
import InputField from "../../UiKit/InputField/InputField";
import WarningOrangeIcon from "../../../assets/Icons/WarningOrangeIcon";
import RevizorWithLoupe from "../../../assets/Icons/RevizorWithLoupe";
import { getAllRequests, sendRequest } from "../../../api/requestApi";
import { useQuery } from "react-query";
import { transformStatusToEnum } from "../../../pages/MyRequestsPage/components/helpers";
import { RequestStatusEnum } from "../../../pages/MyRequestsPage/components/MyRequests/components/RequestRow/RequestRow";
import { getErrorDescription } from "./helpers";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../../routes";

type FormValues = {
  url: string;
};

type Props = {
  onCancel: () => void;
} & ModalProps;

const MakeRequestModal: FC<Props> = ({ onCancel, ...props }) => {
  const { data } = useQuery("allRequests", getAllRequests);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [reportId, setReportId] = useState("");
  const router = useRouter();

  const hasActiveRequest = data?.some(
    (item) =>
      transformStatusToEnum(item.status) === RequestStatusEnum.MODERATION ||
      transformStatusToEnum(item.status) === RequestStatusEnum.INPROGRESS
  );

  const { refetch } = useQuery("allRequests", getAllRequests, {
    enabled: false,
  });

  const handleSubmit = (values: FormValues) => {
    setIsFetching(true);
    setError(null);
    sendRequest(values.url)
      .then((data) => {
        setIsFetching(false);
        if (data.error) {
          setError(data.error);
          setReportId(String(data.object_id) ?? "");
        } else {
          refetch();
          onCancel();
        }
      })
      .catch((err) => {
        setIsFetching(false);
        console.error(err);
      });
  };

  const handleWatchReportClick = () =>
    router.push(PublicRoutes.REPORT.get(reportId));

  return (
    <div className={css.container}>
      <Modal
        className={cn(css.modal, !hasActiveRequest && css.fullscreen)}
        closable={false}
        footer={null}
        wrapClassName={css.modalWrap}
        rootClassName={css.modalRoot}
        {...props}
      >
        <Form<FormValues> onSubmit={handleSubmit}>
          {({ handleSubmit, form }) => (
            <form id="makeRequest" onSubmit={handleSubmit}>
              <div className={css.header}>
                <span>Заявка</span>
                <button className={css.closeIcon} onClick={onCancel}>
                  <ModalCloseIcon />
                </button>
              </div>
              {hasActiveRequest ? (
                <div className={css.modalUnauthorizedBodyContainer}>
                  <RevizorWithLoupe />
                  <div className={css.warning}>
                    <div className={css.warningIconContainer}>
                      <WarningOrangeIcon />
                    </div>
                    <span className={css.warningText}>
                      Проверка нового объекта будет доступна после завершения
                      активной заявки
                    </span>
                  </div>
                </div>
              ) : (
                <div className={css.modalUnauthorizedBodyContainer}>
                  <div className={css.title}>Проверка объекта</div>
                  <div className={css.subtitle}>
                    Прикрепите ссылку на объект с сайта, где он выставлен на
                    продажу (Например, Циан)
                  </div>
                  <Field
                    name="url"
                    type="input"
                    render={({ input }) => <InputField {...input} />}
                  />
                  {error && (
                    <div className={css.error}>
                      {getErrorDescription(error)}
                    </div>
                  )}
                  <div className={css.warning}>
                    <div className={css.warningIconContainer}>
                      <WarningOrangeIcon />
                    </div>
                    <span className={css.warningText}>
                      Для проверки доступны только апартаменты и квартиры из
                      Москвы, Санкт-Петербурга, Ростова-на-Дону, Сочи
                    </span>
                  </div>
                </div>
              )}
              <div className={css.footer}>
                {hasActiveRequest ? (
                  <Button
                    className={css.loginBtn}
                    onClick={onCancel}
                    variant="primary"
                  >
                    Понятно
                  </Button>
                ) : error === 4 ? (
                  <Button
                    className={css.loginBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      handleWatchReportClick();
                    }}
                    variant="primary"
                  >
                    Посмотреть отчёт
                  </Button>
                ) : (
                  <Button
                    disabled={form.getState().values.url?.length ? false : true}
                    className={css.loginBtn}
                    onClick={handleSubmit}
                    variant="primary"
                    showSpinner={isFetching}
                  >
                    Проверить объект
                  </Button>
                )}
              </div>
            </form>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default MakeRequestModal;
