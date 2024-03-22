import { Modal, ModalProps } from "antd";
import { Carousel as AntdCarousel } from "antd";
import React, { FC, useEffect, useRef } from "react";
import css from "./index.module.css";
import ModalCloseIconWhite from "../../../../assets/Icons/ModalCloseIconWhite";
import useCustomMediaQuery from "../../../../hooks/useCustomMediaQuery";
import cn from "classnames";
import ScrollLeftIcon from "../../../../assets/Icons/ScrollLeftIcon";
import ScrollRightIcon from "../../../../assets/Icons/ScrollRightIcon";
import { CarouselRef } from "antd/es/carousel";
import ContactButton from "../../../../components/ContactButton/ContactButton";
import { ReportData } from "../../../../api/reportsApi";

type Props = {
  onCancel: () => void;
  clickedImgSrc: string;
  urls?: string[];
  report?: ReportData;
} & ModalProps;

const FullScreenImgView: FC<Props> = ({
  onCancel,
  clickedImgSrc,
  urls,
  report,
  ...props
}) => {
  const isSmallDesktopScreen = useCustomMediaQuery("(max-width: 1024px)");
  const isSmallScreen = useCustomMediaQuery("(max-width: 450px)");

  const carouselRef = useRef<CarouselRef | null>();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") {
        carouselRef.current?.prev();
      }
      if (e.code === "ArrowRight") {
        carouselRef.current?.next();
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    const clickedImgIndex = urls?.findIndex((item) => item === clickedImgSrc);
    carouselRef.current?.goTo(clickedImgIndex ?? 0);
  }, [clickedImgSrc]);

  return (
    <Modal
      className={css.modal}
      closable={false}
      footer={null}
      onCancel={onCancel}
      {...props}
    >
      <div className={css.header}>
        <div className={css.headerText}>
          {report?.rooms
            ? `${report?.rooms} комн. ·`
            : report?.is_studio
            ? "Cтудия ·"
            : ""}{" "}
          {report?.area ?? "-"} м² · {report?.floor ?? "-"}/
          {report?.floors_total ?? "-"} этаж
        </div>
        <div className={css.headerBtnsContainer}>
          {!isSmallScreen && (
            <ContactButton
              locality={
                report?.Location?.address
                  ? `${
                      report?.Location?.locality_name
                        ? `${report?.Location?.locality_name}, `
                        : ""
                    }${report?.Location?.address}`
                  : report?.Location?.parsed_address
                  ? `${
                      report?.Location?.locality_name
                        ? `${report?.Location?.locality_name}, `
                        : ""
                    }${report?.Location?.parsed_address ?? ""}`
                  : "Адрес не указан"
              }
            />
          )}
          <div className={css.closeIcon} onClick={onCancel}>
            <ModalCloseIconWhite />
          </div>
        </div>
      </div>
      <AntdCarousel
        ref={(ref) => {
          carouselRef.current = ref;
        }}
      >
        {urls?.map((item, index) => (
          <div key={`${item}-${index}`} className={css.mainImgContainer}>
            <img className={css.mainImg} src={item} />
          </div>
        ))}
      </AntdCarousel>
      {isSmallScreen && (
        <div className={css.buttonContainer}>
          <ContactButton
            locality={
              report?.Location?.address
                ? `${
                    report?.Location?.locality_name
                      ? `${report?.Location?.locality_name}, `
                      : ""
                  }${report?.Location?.address}`
                : report?.Location?.parsed_address
                ? `${
                    report?.Location?.locality_name
                      ? `${report?.Location?.locality_name}, `
                      : ""
                  }${report?.Location?.parsed_address ?? ""}`
                : "Адрес не указан"
            }
            className={css.button}
          />
        </div>
      )}
      {!isSmallDesktopScreen && (
        <div className={css.scrollBtnsContainer}>
          <div
            className={cn(css.scrollBtn, css.scrollLeftIconContainer)}
            onClick={() => carouselRef.current?.prev()}
          >
            <ScrollLeftIcon />
          </div>
          <div
            className={cn(css.scrollBtn, css.scrollRigthIconContainer)}
            onClick={() => carouselRef.current?.next()}
          >
            <ScrollRightIcon />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default FullScreenImgView;
