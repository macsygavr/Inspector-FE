import { Carousel as AntdCarousel } from "antd";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import css from "./index.module.css";
import ScrollLeftIcon from "../../../../assets/Icons/ScrollLeftIcon";
import ScrollRightIcon from "../../../../assets/Icons/ScrollRightIcon";
import cn from "classnames";
import { CarouselRef } from "antd/es/carousel";
import Tabs from "../../../../components/UiKit/Tabs/Tabs";
import { CarouselTab, getCarouselTabs, getFirstImageIndex } from "./helpers";
import useCustomMediaQuery from "../../../../hooks/useCustomMediaQuery";
import FullScreenImgView from "../FullScreenImgView/FullScreenImgView";
import { getMockArrayForSkeletons } from "../../../../lib/helpers";
import SkeletonRow from "../../../../components/UiKit/SkeletonRow/SkeletonRow";
import { ImageType, ReportData } from "../../../../api/reportsApi";

type Props = {
  report?: ReportData;
  skeletonMode?: boolean;
  imagesForCarousel?: ImageType[];
};

const Carousel: FC<Props> = ({ report, skeletonMode, imagesForCarousel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedImgSrc, setClickedImgSrc] = useState("");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<CarouselTab | string>("");
  const [wrongUrls, setWrongUrls] = useState<string[]>([]);

  const carouselRef = useRef<CarouselRef | null>();

  const isSmallDesktop = useCustomMediaQuery("(max-width: 1024px)");
  const isSmallScreen = useCustomMediaQuery("(max-width: 768px)");

  const images = useMemo(() => {
    const validImages = imagesForCarousel?.filter(
      (item) => !wrongUrls.includes(item.image)
    );

    const facadeImages = validImages?.filter((item) => item.is_facade) ?? [];
    const yardImages = validImages?.filter((item) => item.is_yard) ?? [];
    const entranceImages =
      validImages?.filter((item) => item.is_entrance) ?? [];
    const layoutImages = validImages?.filter((item) => item.is_layout) ?? [];

    const facade = getFirstImageIndex(imagesForCarousel ?? [], facadeImages);
    const yard = getFirstImageIndex(imagesForCarousel ?? [], yardImages);
    const entrance = getFirstImageIndex(
      imagesForCarousel ?? [],
      entranceImages
    );
    const layout = getFirstImageIndex(imagesForCarousel ?? [], layoutImages);

    return {
      imageIndexes: {
        facade,
        yard,
        entrance,
        layout,
      },
      hasTab: {
        facade: facadeImages.length > 0,
        yard: yardImages.length > 0,
        entrance: entranceImages.length > 0,
        layout: layoutImages.length > 0,
      },
      tabLength: {
        facade: facadeImages.length,
        yard: yardImages.length,
        entrance: entranceImages.length,
        layout: layoutImages.length,
      },
    };
  }, [imagesForCarousel, wrongUrls]);

  const urls = imagesForCarousel?.map((item) => item.image) ?? [];

  const onTabChange = (Tab: string) => {
    switch (Tab) {
      case CarouselTab.Facade:
        carouselRef.current?.goTo(images.imageIndexes.facade);
        break;

      case CarouselTab.Yard:
        carouselRef.current?.goTo(images.imageIndexes.yard);
        break;

      case CarouselTab.Entrance:
        carouselRef.current?.goTo(images.imageIndexes.entrance);
        break;

      case CarouselTab.Layout:
        carouselRef.current?.goTo(images.imageIndexes.layout);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (
      currentImgIndex >= images.imageIndexes.facade &&
      currentImgIndex < images.imageIndexes.facade + images.tabLength.facade
    ) {
      setActiveTab(CarouselTab.Facade);
    } else if (
      currentImgIndex >= images.imageIndexes.yard &&
      currentImgIndex < images.imageIndexes.yard + images.tabLength.yard
    ) {
      setActiveTab(CarouselTab.Yard);
    } else if (
      currentImgIndex >= images.imageIndexes.entrance &&
      currentImgIndex < images.imageIndexes.entrance + images.tabLength.entrance
    ) {
      setActiveTab(CarouselTab.Entrance);
    } else if (
      currentImgIndex >= images.imageIndexes.layout &&
      currentImgIndex < images.imageIndexes.layout + images.tabLength.layout
    ) {
      setActiveTab(CarouselTab.Layout);
    } else {
      setActiveTab("");
    }
  }, [currentImgIndex, images]);

  useEffect(() => {
    const previewContainer = document.querySelector(".slick-dots-bottom");
    const currentImg = previewContainer?.childNodes?.[
      currentImgIndex
    ] as HTMLElement;

    previewContainer?.scrollTo({
      left: (currentImg?.offsetLeft ?? 0) - previewContainer?.clientWidth / 2.5,
      behavior: "smooth",
    });
  }, [currentImgIndex]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        carouselRef.current?.prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        carouselRef.current?.next();
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  const pagingImages = urls?.map((item) => (
    <a className={css.smallImgContainer}>
      <img
        className={css.smallImg}
        src={item}
        alt={"Не удалось загрузить изображение"}
      />
    </a>
  ));

  const handleOnImgClick = (e: any) => {
    setClickedImgSrc(e.target.src);
    setIsModalOpen(true);
  };

  return (
    <>
      <Tabs
        type="line"
        items={getCarouselTabs(images.hasTab)}
        onChange={onTabChange}
        activeKey={
          (activeTab || getCarouselTabs(images.hasTab)?.[0]?.key) ?? ''
        }
      />
      <div
        className={cn(
          css.container,
          skeletonMode && css.disableActiveItem,
          skeletonMode && css.overflowHidden
        )}
      >
        {skeletonMode ? (
          <AntdCarousel
            customPaging={() => (
              <SkeletonRow
                style={
                  isSmallDesktop
                    ? {
                        height: "80px",
                        width: "114px",
                      }
                    : {
                        height: "123px",
                        width: "170px",
                      }
                }
              />
            )}
          >
            {getMockArrayForSkeletons(6)?.map((_, index) => (
              <div key={index} className={css.mainImgContainer}>
                <SkeletonRow
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </AntdCarousel>
        ) : (
          <>
            {!isSmallScreen && urls?.length > 0 && (
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
            <AntdCarousel
              ref={(ref) => {
                carouselRef.current = ref;
              }}
              customPaging={(i) => pagingImages?.[i] ?? <></>}
              beforeChange={(_, current) => setCurrentImgIndex(current)}
            >
              {urls?.length > 0 ? (
                urls.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    onClick={handleOnImgClick}
                    className={css.mainImgContainer}
                  >
                    <img
                      onError={() => setWrongUrls((prev) => [...prev, item])}
                      className={css.mainImg}
                      src={item}
                      alt={"Не удалось загрузить изображение"}
                    />
                  </div>
                ))
              ) : (
                <div className={cn(css.mainImgContainer, css.errorContainer)}>
                  <img className={css.mainImg} src={"/photoError.jpg"} />
                </div>
              )}
            </AntdCarousel>
          </>
        )}
      </div>
      {isModalOpen && (
        <FullScreenImgView
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          clickedImgSrc={clickedImgSrc}
          urls={urls}
          report={report}
        />
      )}
    </>
  );
};

export default Carousel;
