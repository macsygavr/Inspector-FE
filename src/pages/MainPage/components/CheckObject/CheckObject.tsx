import React, { FC } from "react";
import css from "./index.module.css";
import RevizorInGlassesIcon from "../../../../assets/Icons/RevizorInGlassesIcon";
import MakeRequestButton from "../../../../components/MakeRequestButton/MakeRequestButton";

const CheckObject: FC = () => {
  return (
    <div className={css.container}>
      <RevizorInGlassesIcon />
      <div className={css.textContainer}>
        <div className={css.title}>Взгляните на объект недвижимости </div>
        <div className={css.subtitle}>глазами эксперта</div>
      </div>
      <MakeRequestButton variant="primary" className={css.button} />
    </div>
  );
};

export default CheckObject;
