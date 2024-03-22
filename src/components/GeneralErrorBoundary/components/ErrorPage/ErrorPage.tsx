import React, { FC } from "react";
import css from "./index.module.css";
import Button from "../../../UiKit/Button/Button";
import { useRouter } from "next/router";
import RevizorOnChairSmall from "../../../../assets/Icons/RevizorOnChairSmall";

type Props = {
  handleRemoveError: () => void;
};

const ErrorPage: FC<Props> = ({ handleRemoveError }) => {
  const router = useRouter();

  return (
    <div className={css.container}>
      <div className={css.block}>
        <RevizorOnChairSmall />
        <span className={css.title}>У нас что-то сломалось :(</span>
        <span className={css.subtitle}>
          Мы уже ищем проблему и скоро её исправим
        </span>
        <Button
          variant={"primary"}
          onClick={() => {
            handleRemoveError();
            router.back();
          }}
        >
          Вернуться
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
