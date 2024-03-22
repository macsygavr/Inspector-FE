import React, { FC } from "react";
import css from "./index.module.css";
import { ReportData } from "../../../../api/reportsApi";
import { Placemark } from "@pbe/react-yandex-maps";
import ymaps from "yandex-maps";

type Props = {
  item: ReportData;
  ymaps: typeof ymaps | null;
  isActive?: boolean;
  isSingleObjectPin?: boolean;
  onClick: (id: string) => void;
};

const MyPlacemark: FC<Props> = ({
  item,
  ymaps,
  isActive = false,
  isSingleObjectPin = true,
  onClick,
}) => {
  const location = [
    item?.Location?.latitude ?? 0,
    item?.Location?.longitude ?? 0,
  ];

  const getPrice = () => {
    if (item.price) {
      const price = (Number(item.price) / 1000000)
        .toFixed(1)
        .toString()
        .replace(".", ",");

      if (price[price.length - 1] === "0") {
        return `${price.slice(0, -2)} млн`;
      }

      return `${price} млн`;
    }
    return "-";
  };

  const template = ymaps?.templateLayoutFactory.createClass(
    `
    <div class=${css.rootContainerPin} id=${item.id}>
      <div class=${isActive ? css.activeContainerPin : css.containerPin}>
        ${
          !isSingleObjectPin
            ? `<div class=${
                isActive ? css.activeObjectsCountTagPin : css.objectsCountTagPin
              }>
            77
          </div>`
            : ""
        }
        <div class=${isActive ? css.activePricePin : css.pricePin}>
          ${!isSingleObjectPin ? "От " : ""}
          ${getPrice()}
        </div>
      </div>
      <div class=${css.linePin}>
        ${
          isActive
            ? `<svg
            width="13"
            height="2"
            viewBox="0 0 13 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="13" height="2" fill="#FF6503" />
          </svg>`
            : `<svg
            width="13"
            height="2"
            viewBox="0 0 13 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="13" height="2" fill="white" />
          </svg>`
        }
      </div>
      <div class=${css.pinPin}>
        ${
          isActive
            ? `<svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0.5H0V1V1.5C1.37366 1.5 2.23508 1.95094 2.81892 2.58786C3.42194 3.2457 3.77171 4.14841 4.01493 5.12127C4.13564 5.6041 4.2269 6.0899 4.31288 6.55891C4.31928 6.59379 4.32565 6.62864 4.33202 6.66344C4.40993 7.0893 4.48632 7.50684 4.57743 7.87127C4.67412 8.25802 4.80024 8.64214 5.00032 8.937C5.21612 9.25501 5.54322 9.5 6 9.5C6.45678 9.5 6.78388 9.25501 6.99968 8.937C7.19976 8.64214 7.32588 8.25802 7.42257 7.87127C7.51368 7.50684 7.59007 7.0893 7.66798 6.66344C7.67435 6.62864 7.68072 6.59379 7.68712 6.55891C7.7731 6.0899 7.86436 5.6041 7.98507 5.12127C8.22829 4.14841 8.57806 3.2457 9.18108 2.58786C9.76492 1.95094 10.6263 1.5 12 1.5V1V0.5H6Z"
              fill="#FF6503"
              stroke="white"
            />
          </svg>`
            : `<svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0.5H0V1V1.5C1.37366 1.5 2.23508 1.95094 2.81892 2.58786C3.42194 3.2457 3.77171 4.14841 4.01493 5.12127C4.13564 5.6041 4.2269 6.0899 4.31288 6.55891C4.31928 6.59379 4.32565 6.62864 4.33202 6.66344C4.40993 7.0893 4.48632 7.50684 4.57743 7.87127C4.67412 8.25802 4.80024 8.64214 5.00032 8.937C5.21612 9.25501 5.54322 9.5 6 9.5C6.45678 9.5 6.78388 9.25501 6.99968 8.937C7.19976 8.64214 7.32588 8.25802 7.42257 7.87127C7.51368 7.50684 7.59007 7.0893 7.66798 6.66344C7.67435 6.62864 7.68072 6.59379 7.68712 6.55891C7.7731 6.0899 7.86436 5.6041 7.98507 5.12127C8.22829 4.14841 8.57806 3.2457 9.18108 2.58786C9.76492 1.95094 10.6263 1.5 12 1.5V1V0.5H6Z"
              fill="white"
              stroke="#F89657"
            />
          </svg>`
        }
      </div>
    </div>
    `,
    {
      build: function () {
        // @ts-ignore
        template?.superclass?.build.call(this);
        const pinContainer: HTMLElement =
        // @ts-ignore
          this.getParentElement().getElementsByClassName(
            css.rootContainerPin
          )[0];
        const pinWidth = pinContainer.getClientRects()?.[0].width;
        // @ts-ignore
        this.getData().options.set("shape", {
          type: "Rectangle",
          coordinates: [
            [0, 0],
            [pinWidth ?? 60, 25],
          ],
        });
      },
    }
  );

  return (
    <Placemark
      key={`${item.Location?.latitude}-${item.id}`}
      geometry={location}
      options={{
        iconLayout: template,
        iconOffset: [-30, -30],
      }}
      onClick={() => onClick(String(item.id) ?? "")}
    />
  );
};

export default MyPlacemark;
