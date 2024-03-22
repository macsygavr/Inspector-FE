import React, { FC, useEffect } from "react";
import ModalCloseIcon from "../../../../../assets/Icons/ModalCloseIcon";
import { Field } from "react-final-form";
import InputPhone from "../../../../UiKit/InputPhone/InputPhone";
import Button from "../../../../UiKit/Button/Button";
import css from "../../../index.module.css";
import { FormValues } from "../../AuthorizationModal";
import { FormApi } from "final-form";

type Props = {
  onCancel: () => void;
  handleSubmit: () => void;
  form: FormApi<FormValues, Partial<FormValues>>;
  isFetching: boolean;
};

const LoginPhoneModal: FC<Props> = ({
  onCancel,
  handleSubmit,
  form,
  isFetching,
}) => {
  return (
    <>
      <div className={css.header}>
        <span>Авторизация</span>
        <button className={css.closeIcon} onClick={onCancel}>
          <ModalCloseIcon />
        </button>
      </div>
      <div className={css.modalUnauthorizedBodyContainer}>
        <div className={css.title}>Введите номер</div>
        <div className={css.subtitle}>Мы вышлем на него код подтверждения</div>
        <Field
          name="phone"
          type="input"
          render={({ input }) => (
            <InputPhone
              {...input}
              handleSubmit={handleSubmit}
              disableSubmit={
                isFetching || form.getState().values.phone?.length !== 11
              }
            />
          )}
        />
      </div>
      <div className={css.footer}>
        <Button
          disabled={isFetching || form.getState().values.phone?.length !== 11}
          className={css.loginBtn}
          onClick={handleSubmit}
          variant="primary"
          showSpinner={isFetching}
        >
          Отправить код
        </Button>
      </div>
    </>
  );
};

export default LoginPhoneModal;
