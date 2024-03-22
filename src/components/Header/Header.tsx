import React, { FC, useEffect } from "react";
import LogoRevizor from "../../assets/LogoRevizor";
import Button from "../UiKit/Button/Button";
import NavMenu from "../NavMenu/NavMenu";
import css from "./index.module.css";
import LoginIcon from "../../assets/Icons/LoginIcon";
import { useModalState } from "../../hooks/useModalState";
import AuthorizationModal from "../Modals/AuthorizationModal/AuthorizationModal";
import Link from "next/link";
import { PublicRoutes } from "../../routes";
import { useRouter } from "next/router";
import MakeRequestButton from "../MakeRequestButton/MakeRequestButton";
import { useProfileContext } from "../../contexts/ProfileContext";

const Header: FC = () => {
  const { isAuthorized } = useProfileContext();
  const authorizationModal = useModalState();
  const { route } = useRouter();

  return (
    <>
      <div className={css.header}>
        <div className={css.logo}>
          {route === PublicRoutes.MAIN.static ? (
            <LogoRevizor />
          ) : (
            <Link
              aria-label={"Go to main page"}
              href={PublicRoutes.MAIN.static}
            >
              <LogoRevizor />
            </Link>
          )}
        </div>
        <div className={css.navMenuContainer}>
          <NavMenu />
        </div>
        <div className={css.checkButton}>
          <MakeRequestButton variant="secondary" />
          {isAuthorized ? (
            <Button
              onClick={() => {
                authorizationModal.open();
              }}
              className={css.profileBtn}
              variant="secondary"
              aria-label={"Profile"}
            >
              <LoginIcon />
            </Button>
          ) : (
            <Button
              onClick={() => {
                authorizationModal.open();
              }}
              className={css.loginBtn}
              variant="ghost"
            >
              Войти
            </Button>
          )}
        </div>
      </div>
      {authorizationModal.opened && (
        <AuthorizationModal
          open={authorizationModal.opened}
          onCancel={authorizationModal.close}
        />
      )}
    </>
  );
};

export default Header;
