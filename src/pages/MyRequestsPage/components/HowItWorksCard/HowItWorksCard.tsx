import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";

type Props = {
  step: number;
  title: string;
  innerImgSrc?: string;
  description: string;
};

const HowItWorksCard: FC<Props> = ({
  step,
  title,
  innerImgSrc,
  description,
}) => {
  return (
    <div className={css.container}>
      <div className={css.stepTagsContainer}>
        <div className={cn(css.stepTag, step === 1 && css.stepTagChecked)}>
          Шаг 1
        </div>
        <div className={cn(css.stepTag, step === 2 && css.stepTagChecked)}>
          Шаг 2
        </div>
        <div className={cn(css.stepTag, step === 3 && css.stepTagChecked)}>
          Шаг 3
        </div>
      </div>
      <span className={css.title}>{title}</span>
      <img
        className={css.img}
        src={innerImgSrc}
        alt={"Не удалось загрузить изображение"}
      />
      <span className={css.description}>{description}</span>
    </div>
  );
};

export default HowItWorksCard;
