import React, { FC } from "react";
import Button from "../UiKit/Button/Button";
import css from "./index.module.css";
import { useRouter } from "next/router";

const ErrorMessage: FC = () => {
  const router = useRouter()

  return (
    <div className={css.container}>
      <Button variant="primary" onClick={router.reload}>Обновить</Button>
      <div className={css.text}>Возникла ошибка, обновите страницу</div>
    </div>
  );
};

export default ErrorMessage;
