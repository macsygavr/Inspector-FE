import React, { FC, useEffect, useState } from "react";
import ModalCloseIcon from "../../../../../assets/Icons/ModalCloseIcon";
import { Field } from "react-final-form";
import InputCode from "../../../../UiKit/InputCode/InputCode";
import Button from "../../../../UiKit/Button/Button";
import css from "../../../index.module.css";
import { FormValues } from "../../AuthorizationModal";
import { FormApi } from "final-form";
import { setPhoneMask } from "./helpers";
import cn from "classnames";
import { getSmsCode } from "../../../../../api/accountApi";

type Props = {
  onCancel: () => void;
  handleSubmit: () => void;
  form: FormApi<FormValues, Partial<FormValues>>;
  hasCodeError: boolean;
  handleSetCodeError: (value: boolean) => void;
  isFetching?: boolean;
};

const LoginCodeModal: FC<Props> = ({
  onCancel,
  handleSubmit,
  form,
  hasCodeError,
  handleSetCodeError,
  isFetching,
}) => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [timer]);

  const onCodeChange = (value: string) => {
    handleSetCodeError(false);
    setCode(value);
  };

  return (
    <>
      <div className={css.header}>
        <span>Авторизация</span>
        <button className={css.closeIcon} onClick={onCancel}>
          <ModalCloseIcon />
        </button>
      </div>
      <div className={css.modalUnauthorizedBodyContainer}>
        <div className={css.title}>Введите код</div>
        <div className={css.subtitle}>
          Мы отправили СМС с кодом на номер{" "}
          {setPhoneMask(form.getState().values.phone) ?? ""}
        </div>
        <Field
          name="code"
          type="input"
          render={({ input }) => (
            <InputCode
              error={hasCodeError}
              code={code}
              onCodeChange={onCodeChange}
              onChange={input.onChange}
              handleSubmit={handleSubmit}
            />
          )}
        />
        <span className={cn(css.timerSpan, timer === 0 && css.hidden)}>
          Отправить код повторно можно через {timer} сек.
        </span>
      </div>
      <div className={css.footer}>
        {timer === 0 && (
          <Button
            className={css.loginBtn}
            onClick={() => {
              getSmsCode(form.getState().values.phone);
              handleSetCodeError(false);
              setCode("");
              setTimer(60);
            }}
            variant="ghost"
          >
            Отправить код повторно
          </Button>
        )}
        <Button
          disabled={form.getState().values.code?.length !== 4}
          className={css.loginBtn}
          onClick={handleSubmit}
          variant="primary"
          showSpinner={isFetching}
        >
          Войти
        </Button>
      </div>
    </>
  );
};

export default LoginCodeModal;
