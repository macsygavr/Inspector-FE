import React, { FC } from "react";
import DzenIcon from "../../assets/Icons/DzenIcon";
import LogoRevizor from "../../assets/LogoRevizor";
import TelegrammIcon from "../../assets/Icons/TelegrammIcon";
import YouTubeIcon from "../../assets/Icons/YouTubeIcon";
import Button from "../UiKit/Button/Button";
import NavMenu from "../NavMenu/NavMenu";
import css from "./index.module.css";
import LogoBackground from "../../assets/LogoBackground";
import useCustomMediaQuery from "../../hooks/useCustomMediaQuery";
import MobileNavMenu from "../MobileNavMenu/MobileNavMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../routes";
import { CitiesEnum } from "../../pages/AllReportsPage/components/CityGeolocation/CityGeolocation";
import { transformCityTitleToCityEnum } from "../../pages/AllReportsPage/helpers";

const Footer: FC = () => {
  const router = useRouter();
  const showNavMenuDown = useCustomMediaQuery("(max-width: 768px)");

  return (
    <>
      <div className={css.footerContainer}>
        <div className={css.footerUp}>
          <div className={css.logo}>
            <LogoRevizor light />
          </div>
          {!showNavMenuDown && <NavMenu />}
          <div className={css.socialMediaContainer}>
            <Button
              aria-label={"Open YouTube"}
              className={css.socialMediaButton}
            >
              <Link
                href="https://www.youtube.com/@smirnov_real_estate"
                target="_blank"
                aria-label={"Open YouTube"}
              >
                <YouTubeIcon />
              </Link>
            </Button>
            <Button
              aria-label={"Open Yandex Dzen"}
              className={css.socialMediaButton}
            >
              <Link
                aria-label={"Open Yandex Dzen"}
                href="https://dzen.ru/vysotskyestate"
                target="_blank"
              >
                <DzenIcon />
              </Link>
            </Button>
            <Button
              aria-label={"Open Telegramm"}
              className={css.socialMediaButton}
            >
              <Link
                aria-label={"Open Telegramm"}
                href="https://t.me/ogo_nedviga"
                target="_blank"
              >
                <TelegrammIcon />
              </Link>
            </Button>
          </div>
          {showNavMenuDown && <NavMenu />}
        </div>
        <div className={css.separator} style={{ marginTop: "12px" }}></div>
        <div className={css.footerMiddle}>
          <div className={css.middleTitle}>Объекты в городах</div>
          <div className={css.citiesBtns}>
            <Button
              onClick={() =>
                router.push(
                  PublicRoutes.ALL_REPORTS.get(
                    transformCityTitleToCityEnum(CitiesEnum.Moscow)
                  )
                )
              }
              variant={"text"}
              className={css.objectsButton}
            >
              Москва
            </Button>
            <Button
              onClick={() =>
                router.push(
                  PublicRoutes.ALL_REPORTS.get(
                    transformCityTitleToCityEnum(CitiesEnum.StPetersburg)
                  )
                )
              }
              variant={"text"}
              className={css.objectsButton}
            >
              Санкт-Петербург
            </Button>
            <Button
              onClick={() =>
                router.push(
                  PublicRoutes.ALL_REPORTS.get(
                    transformCityTitleToCityEnum(CitiesEnum.Sochi)
                  )
                )
              }
              variant={"text"}
              className={css.objectsButton}
            >
              Сочи
            </Button>
            <Button
              onClick={() =>
                router.push(
                  PublicRoutes.ALL_REPORTS.get(
                    transformCityTitleToCityEnum(CitiesEnum.RostovOnDon)
                  )
                )
              }
              variant={"text"}
              className={css.objectsButton}
            >
              Ростов-на-Дону
            </Button>

            <Button
              onClick={() =>
                router.push(
                  PublicRoutes.ALL_REPORTS.get(
                    transformCityTitleToCityEnum(CitiesEnum.Kazan)
                  )
                )
              }
              variant={"text"}
              className={css.objectsButton}
            >
              Казань
            </Button>
            <Button
              onClick={() =>
                router.push(
                  PublicRoutes.ALL_REPORTS.get(
                    transformCityTitleToCityEnum(CitiesEnum.Irkutsk)
                  )
                )
              }
              variant={"text"}
              className={css.objectsButton}
            >
              Иркутск
            </Button>
            <Button
              onClick={() =>
                router.push(
                  PublicRoutes.ALL_REPORTS.get(
                    transformCityTitleToCityEnum(CitiesEnum.Habarovsk)
                  )
                )
              }
              variant={"text"}
              className={css.objectsButton}
            >
              Хабаровск
            </Button>
          </div>
        </div>
        <div className={css.separator}></div>
        <div className={css.footerDown}>
          <span className={css.span}>© 2023 Инспектор</span>
          <a className={css.email} href="mailto:revizor.estate@yandex.ru">
            revizor.estate@yandex.ru
          </a>
          <LogoBackground />
        </div>
      </div>
      <MobileNavMenu />
    </>
  );
};

export default Footer;
