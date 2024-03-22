import React, { FC } from "react";
import css from "./index.module.css";
import { useRouter } from "next/router";
import Button from "../../components/UiKit/Button/Button";
import { PublicRoutes } from "../../routes";
import RevizorErrorPage from "../../assets/Icons/RevizorErrorPage";

type Props = {
  customSubtitleText?: string;
  customBtnText?: string;
  redirectToAllReports?: boolean;
  redirectToAllAgents?: boolean;
};

const CustomErrorPage: FC<Props> = ({
  customSubtitleText,
  customBtnText,
  redirectToAllReports,
  redirectToAllAgents,
}) => {
  const router = useRouter();

  return (
    <div className={css.offerHeadBlock}>
      <div className={css.offerTextContainer}>
        <span className={css.offerTitle}>Кажется, что-то пошло не так!</span>
        <span className={css.offerSubTitle}>
          {customSubtitleText ||
            "Страница, которую вы запрашиваете, не существует. Возможно она устарела или был введен неверный адрес"}
        </span>
        <Button
          variant="primary"
          className={css.btn}
          onClick={() => {
            redirectToAllAgents
              ? router.push(PublicRoutes.ALL_AGENTS.static)
              : redirectToAllReports
              ? router.push(PublicRoutes.ALL_REPORTS.static)
              : router.push(PublicRoutes.MAIN.static);
          }}
        >
          {customBtnText || "На главную"}
        </Button>
      </div>
      <div className={css.revizorIconContainer}>
        <RevizorErrorPage />
      </div>
    </div>
  );
};

export default CustomErrorPage;
