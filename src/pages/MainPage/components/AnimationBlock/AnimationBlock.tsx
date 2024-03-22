import React, { FC, useEffect, useState } from "react";
import css from "./index.module.css";
import cn from "classnames";
import RevizorAnimationIcon from "../../../../assets/Icons/RevizorAnimationIcon";

const AnimationBlock: FC = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const animationContainer: HTMLElement | null =
      document.getElementById("animationContainer");

    const scrollListener = () => {
      if (animationContainer) {
        if (
          animationContainer?.getBoundingClientRect().top <
          (animationContainer?.clientHeight / 2.45) * -1
        ) {
          setSlide(3);
        } else if (
          animationContainer?.getBoundingClientRect().top <
          (animationContainer?.clientHeight / 4.6) * -1
        ) {
          setSlide(2);
        } else if (
          animationContainer?.getBoundingClientRect().top <
          animationContainer?.clientHeight / 127
        ) {
          setSlide(1);
        } else {
          setSlide(0);
        }
      }
    };

    document.addEventListener("scroll", scrollListener);

    return () => document.removeEventListener("scroll", scrollListener);
  }, []);

  useEffect(() => {
    const textBlock0: HTMLElement | null =
      document.getElementById("textBlock0");
    const textBlock1: HTMLElement | null =
      document.getElementById("textBlock1");
    const textBlock2: HTMLElement | null =
      document.getElementById("textBlock2");
    const textBlock3: HTMLElement | null =
      document.getElementById("textBlock3");

    if (textBlock0) {
      if (slide === 0) {
        textBlock0.classList.add(css.nonBlur);
        textBlock0.classList.remove(css.blur);
      } else {
        textBlock0.classList.remove(css.nonBlur);
        textBlock0.classList.add(css.blur);
      }
    }

    if (textBlock1) {
      if (slide === 1) {
        textBlock1.classList.add(css.nonBlur);
        textBlock1.classList.remove(css.blur);
      } else {
        textBlock1.classList.remove(css.nonBlur);
        textBlock1.classList.add(css.blur);
      }
    }

    if (textBlock2) {
      if (slide === 2) {
        textBlock2.classList.add(css.nonBlur);
        textBlock2.classList.remove(css.blur);
      } else {
        textBlock2.classList.remove(css.nonBlur);
        textBlock2.classList.add(css.blur);
      }
    }

    if (textBlock3) {
      if (slide === 3) {
        textBlock3.classList.add(css.nonBlur);
        textBlock3.classList.remove(css.blur);
      } else {
        textBlock3.classList.remove(css.nonBlur);
        textBlock3.classList.add(css.blur);
      }
    }
  }, [slide]);

  return (
    <div id="animationContainer" className={css.animationContainer}>
      <div className={css.iconContainerWrapper}>
        <div className={css.iconContainer}>
          <RevizorAnimationIcon fingersCount={slide + 1} />
        </div>
      </div>
      <div className={css.allTextsContainer}>
        {facts.map((_, index) => (
          <div
            key={index}
            id={`textBlock${index}`}
            className={css.textContainer}
          >
            <div className={cn(css.text, css.title)}>
              {facts?.[index]?.title}
            </div>
            <div className={cn(css.text, css.subtitle)}>
              {facts?.[index]?.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimationBlock;

const facts = [
  {
    title: "Независимо оцениваем",
    subtitle: "вероятность совершения сделки",
  },
  {
    title: "Рассказываем о деталях состояния квартиры и дома,",
    subtitle: "скрытых от ваших глаз",
  },
  {
    title: "Раскрытие юридических аспектов",
    subtitle: "интересующего вас объекта",
  },
  {
    title: "Отчет бесплатный",
    subtitle: "для всех",
  },
];
