import React, { FC, useState } from "react";
import css from "./index.module.css";
import { AgentType } from "../../../../api/reportsApi";
import ProfileOffIcon from "../../../../assets/Icons/ProfileOffIcon";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../../../routes";

type Props = {
  agent: AgentType;
};

const AgentCard: FC<Props> = ({ agent }) => {
  const router = useRouter();

  const [avatarError, setAvatarError] = useState(false);

  const handleCardClick = () => {
    router.push(PublicRoutes.AGENT.get(agent.externalid ?? ""));
  };

  return (
    <div className={css.container} onClick={handleCardClick}>
      <div className={css.avatarContainer}>
        {!agent.photo || avatarError ? (
          <ProfileOffIcon />
        ) : (
          <img
            className={css.avatarImg}
            src={agent?.photo}
            onError={() => setAvatarError(true)}
          />
        )}
      </div>
      <div className={css.agentInfoContainer}>
        <span className={css.agentName}>
          {agent?.name ?? "Не указано"}
        </span>
        {/* <div className={css.agentInfoText}>
          Руководитель офиса <span className={css.dot}>·</span> Москва
          Ботанический сад
        </div> */}
      </div>
    </div>
  );
};

export default AgentCard;
