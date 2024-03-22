import React, { FC, ReactNode } from "react";
import css from "./index.module.css";

type Props = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

const OfferCard: FC<Props> = ({ icon, title, subtitle }) => {
  return (
    <div className={css.container}>
      <div className={css.iconContainer}>
      {icon}
      </div>
      <div className={css.textContainer}>
        <span className={css.title}>{title}</span>
        <span className={css.subtitle}>{subtitle}</span>
      </div>
    </div>
  );
};

export default OfferCard;
