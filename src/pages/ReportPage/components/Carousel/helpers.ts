import { ImageType } from "../../../../api/reportsApi";

export enum CarouselTab {
  Facade = "Фасад",
  Yard = "Двор",
  Entrance = "Подъезд",
  Layout = "Планировка",
}

export const getCarouselTabs = (hasTab: {
  facade: boolean;
  yard: boolean;
  entrance: boolean;
  layout: boolean;
}) => {
  const tabs = [];

  if (hasTab.facade) {
    tabs.push({
      key: CarouselTab.Facade,
      label: CarouselTab.Facade,
    });
  }

  if (hasTab.yard) {
    tabs.push({
      key: CarouselTab.Yard,
      label: CarouselTab.Yard,
    });
  }

  if (hasTab.entrance) {
    tabs.push({
      key: CarouselTab.Entrance,
      label: CarouselTab.Entrance,
    });
  }

  if (hasTab.layout) {
    tabs.push({
      key: CarouselTab.Layout,
      label: CarouselTab.Layout,
    });
  }

  return tabs;
};

export const getFirstImageIndex = (
  allImages: ImageType[],
  imagesArr: ImageType[]
) => allImages.findIndex((item) => item.image === imagesArr?.[0]?.image);
