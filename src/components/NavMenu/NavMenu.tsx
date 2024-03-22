import React, { FC } from "react";
import Button from "../UiKit/Button/Button";
import css from "./index.module.css";
import { PublicRoutes } from "../../routes";
import { useRouter } from "next/router";

const NavMenu: FC = () => {
  const router = useRouter();

  return (
    <div className={css.navMenuContainer}>
      <Button
        onClick={() => router.push(PublicRoutes.ALL_REPORTS.static)}
        variant={"text"}
        className={css.navMenuButton}
      >
        Все объекты
      </Button>
      <Button
        onClick={() => router.push(PublicRoutes.MY_REQUESTS.static)}
        variant={"text"}
        className={css.navMenuButton}
      >
        Мои заявки
      </Button>
      <Button
        onClick={() => router.push(PublicRoutes.ALL_AGENTS.static)}
        variant={"text"}
        className={css.navMenuButton}
      >
        Наши инспекторы
      </Button>
    </div>
  );
};

export default NavMenu;
