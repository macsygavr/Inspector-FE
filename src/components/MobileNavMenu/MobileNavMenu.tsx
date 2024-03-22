import React, { FC, useEffect, useState } from "react";
import css from "./index.module.css";
import cn from "classnames";
import TownOnIcon from "../../assets/Icons/TownOnIcon";
import TownOffIcon from "../../assets/Icons/TownOffIcon";
import MyDocOnIcon from "../../assets/Icons/MyDocOnIcon";
import MyDocOffIcon from "../../assets/Icons/MyDocOffIcon";
import ProfileOnIcon from "../../assets/Icons/ProfileOnIcon";
import ProfileOffIcon from "../../assets/Icons/ProfileOffIcon";
import SignInOnIcon from "../../assets/Icons/SignInOnIcon";
import SignInOffIcon from "../../assets/Icons/SignInOffIcon";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../routes";
import { useModalState } from "../../hooks/useModalState";
import AuthorizationModal from "../Modals/AuthorizationModal/AuthorizationModal";
import { useProfileContext } from "../../contexts/ProfileContext";
import AgentOnIcon from "../../assets/Icons/AgentsOnIcon";
import AgentOffIcon from "../../assets/Icons/AgentsOffIcon";
import { getActiveNavBtn } from "./helpers";

export enum NavMenuButton {
  AllObjects = "AllObjects",
  MyRequests = "MyRequests",
  LoginBtn = "LoginBtn",
  ProfileBtn = "ProfileBtn",
  AllAgents = "AllAgents"
}

const MobileNavMenu: FC = () => {
  const { route, push } = useRouter();
  const [activeBtn, setActiveBtn] = useState<NavMenuButton | null>(getActiveNavBtn(route));
  const authorizationModal = useModalState();

  const { isAuthorized } = useProfileContext();

  return (
    <div className={css.container}>
      <div
        className={css.btn}
        onClick={() => {
          push(PublicRoutes.ALL_REPORTS.static);
          setActiveBtn(NavMenuButton.AllObjects);
        }}
      >
        <div className={css.iconContainer}>
          {activeBtn === NavMenuButton.AllObjects ? (
            <TownOnIcon />
          ) : (
            <TownOffIcon />
          )}
        </div>
        <div
          className={cn(
            css.btnName,
            activeBtn === NavMenuButton.AllObjects && css.btnNameActive
          )}
        >
          Все объекты
        </div>
      </div>
      <div
        className={css.btn}
        onClick={() => {
          push(PublicRoutes.MY_REQUESTS.static);
          setActiveBtn(NavMenuButton.MyRequests);
        }}
      >
        <div className={css.iconContainer}>
          {activeBtn === NavMenuButton.MyRequests ? (
            <MyDocOnIcon />
          ) : (
            <MyDocOffIcon />
          )}
        </div>
        <div
          className={cn(
            css.btnName,
            activeBtn === NavMenuButton.MyRequests && css.btnNameActive
          )}
        >
          Мои заявки
        </div>
      </div>
      <div
        className={css.btn}
        onClick={() => {
          push(PublicRoutes.ALL_AGENTS.static);
          setActiveBtn(NavMenuButton.AllAgents);
        }}
      >
        <div className={css.iconContainer}>
          {activeBtn === NavMenuButton.AllAgents ? (
            <AgentOnIcon />
          ) : (
            <AgentOffIcon />
          )}
        </div>
        <div
          className={cn(
            css.btnName,
            activeBtn === NavMenuButton.AllAgents && css.btnNameActive
          )}
        >
          Наши агенты
        </div>
      </div>
      {isAuthorized ? (
        <div
          className={css.btn}
          onClick={() => {
            authorizationModal.open();
            setActiveBtn(NavMenuButton.ProfileBtn);
          }}
        >
          <div className={css.iconContainer}>
            {activeBtn === NavMenuButton.ProfileBtn ? (
              <ProfileOnIcon />
            ) : (
              <ProfileOffIcon />
            )}
          </div>
          <div
            className={cn(
              css.btnName,
              activeBtn === NavMenuButton.ProfileBtn && css.btnNameActive
            )}
          >
            Профиль
          </div>
        </div>
      ) : (
        <div
          className={css.btn}
          onClick={() => {
            authorizationModal.open();
            setActiveBtn(NavMenuButton.LoginBtn);
          }}
        >
          <div className={css.iconContainer}>
            {activeBtn === NavMenuButton.LoginBtn ? (
              <SignInOnIcon />
            ) : (
              <SignInOffIcon />
            )}
          </div>
          <div
            className={cn(
              css.btnName,
              activeBtn === NavMenuButton.LoginBtn && css.btnNameActive
            )}
          >
            Войти
          </div>
        </div>
      )}
      {authorizationModal.opened && (
        <AuthorizationModal
          open={authorizationModal.opened}
          onCancel={authorizationModal.close}
        />
      )}
    </div>
  );
};

export default MobileNavMenu;
