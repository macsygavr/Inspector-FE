import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";
import { getMockArrayForSkeletons } from "../../../../../../lib/helpers";

export enum ProgressLevel {
  None = "None",
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

const bigProgressTitleList: { [key in ProgressLevel]: string } = {
  [ProgressLevel.None]: "Не указано",
  [ProgressLevel.Low]: "Низкая",
  [ProgressLevel.Medium]: "Средняя",
  [ProgressLevel.High]: "Высокая",
};

export const smallProgressTitleList: { [key in ProgressLevel]: string } = {
  [ProgressLevel.None]: "Не указано",
  [ProgressLevel.Low]: "Плохо",
  [ProgressLevel.Medium]: "Хорошо",
  [ProgressLevel.High]: "Отлично",
};

const classNameList: { [key in ProgressLevel]: string } = {
  [ProgressLevel.None]: css.grey,
  [ProgressLevel.Low]: css.red,
  [ProgressLevel.Medium]: css.yellow,
  [ProgressLevel.High]: css.green,
};

type Props = {
  level: ProgressLevel;
  levelNumber?: number | null;
  size?: "big" | "small";
};

const ProgressBar: FC<Props> = ({ level, size = "big", levelNumber }) => {
  return (
    <>
      {size === "big" ? (
        <div className={css.bigContainer}>
          <div className={css.titleContainer}>
            <span className={css.title}>{bigProgressTitleList[level]}</span>
            &nbsp;
            <span className={css.subtitle}>{`(${levelNumber ?? 0}%)`}</span>
          </div>
          <div className={css.bigPogressContainer}>
            <div className={css.bigProgressSection}>
              <div
                style={{
                  width: `${
                    (levelNumber ?? 0) >= 33 ? 100 : (levelNumber ?? 0) * 3
                  }%`,
                }}
                className={cn(
                  css.progressSection,
                  css.borderRadiusNone,
                  classNameList[level]
                )}
              ></div>
              <div
                style={{
                  width: `${
                    (levelNumber ?? 0) >= 33 ? 0 : 100 - (levelNumber ?? 0) * 3
                  }%`,
                }}
                className={cn(
                  css.progressSection,
                  css.borderRadiusNone,
                  classNameList[ProgressLevel.None]
                )}
              ></div>
            </div>

            <div className={css.bigProgressSection}>
              <div
                style={{
                  width: `${
                    (levelNumber ?? 0) <= 33 ? 0 : ((levelNumber ?? 0) - 33) * 3
                  }%`,
                }}
                className={cn(
                  css.progressSection,
                  css.borderRadiusNone,
                  classNameList[level]
                )}
              ></div>
              <div
                style={{
                  width: `calc(100% - ${
                    (levelNumber ?? 0) <= 33 ? 0 : ((levelNumber ?? 0) - 33) * 3
                  }%)`,
                }}
                className={cn(
                  css.progressSection,
                  css.borderRadiusNone,
                  classNameList[ProgressLevel.None]
                )}
              ></div>
            </div>

            <div className={css.bigProgressSection}>
              <div
                style={{
                  width: `${
                    (levelNumber ?? 0) <= 66 ? 0 : ((levelNumber ?? 0) - 66) * 3
                  }%`,
                }}
                className={cn(
                  css.progressSection,
                  css.borderRadiusNone,
                  classNameList[level]
                )}
              ></div>
              <div
                style={{
                  width: `calc(100% - ${
                    (levelNumber ?? 0) <= 66 ? 0 : ((levelNumber ?? 0) - 66) * 3
                  }%)`,
                }}
                className={cn(
                  css.progressSection,
                  css.borderRadiusNone,
                  classNameList[ProgressLevel.None]
                )}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className={css.smallPogressContainer}>
          {getMockArrayForSkeletons(levelNumber ?? 0).map((_, index) => (
            <div
              key={index}
              className={cn(css.progressSection, classNameList[level])}
            ></div>
          ))}
          {getMockArrayForSkeletons(10 - (levelNumber ?? 0)).map((_, index) => (
            <div
              key={index}
              className={cn(
                css.progressSection,
                classNameList[ProgressLevel.None]
              )}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProgressBar;
