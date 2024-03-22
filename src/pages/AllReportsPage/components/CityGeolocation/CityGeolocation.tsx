import React, { FC, useEffect, useRef, useState } from "react";
import PinSmallIcon from "../../../../assets/Icons/PinSmallIcon";
import { TooltipPlacement } from "antd/es/tooltip";
import { FieldInputProps } from "react-final-form";
import css from "./index.module.css";
import Tooltip from "../../../../components/UiKit/Tooltip/Tooltip";
import RadioGroup from "../../../../components/UiKit/RadioGroup/RadioGroup";
import { FiltersFormValues } from "../Filters/Filters";

export enum CitiesEnum {
  Moscow = "Москва",
  StPetersburg = "Санкт-Петербург",
  RostovOnDon = "Ростов-на-Дону",
  Sochi = "Сочи",
  Kazan = "Казань",
  Irkutsk = "Иркутск",
  Habarovsk = "Хабаровск",
}

type Props = {
  tooltipPlacement?: TooltipPlacement;
  groupName: string;
  filters: FiltersFormValues;
  setFilters: (value: FiltersFormValues, isFromCityTooltip?: boolean) => void;
  handleSetSelectedCity?: (value: CitiesEnum) => void;
} & Partial<FieldInputProps<any, HTMLElement>>;

const CityGeolocation: FC<Props> = ({
  tooltipPlacement = "bottomRight",
  groupName,
  filters,
  setFilters,
  handleSetSelectedCity,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  return (
    <div className={css.geolocationTitleContainer}>
      <div className={css.pinIconContainer} onClick={() => setIsOpen(true)}>
        <PinSmallIcon />
      </div>
      <div className={css.geolocationTitle}>
        <Tooltip
          open={isOpen}
          content={
            <div
              className={css.geolocationPopupContent}
              onClick={() => setIsOpen(false)}
              ref={popupRef}
            >
              <RadioGroup
                {...props}
                className={css.radioContainer}
                rowClassName={css.radioRow}
                groupName={groupName}
                options={[
                  {
                    label: CitiesEnum.Moscow,
                    value: CitiesEnum.Moscow,
                  },
                  {
                    label: CitiesEnum.StPetersburg,
                    value: CitiesEnum.StPetersburg,
                  },
                  {
                    label: CitiesEnum.RostovOnDon,
                    value: CitiesEnum.RostovOnDon,
                  },
                  {
                    label: CitiesEnum.Sochi,
                    value: CitiesEnum.Sochi,
                  },
                  {
                    label: CitiesEnum.Kazan,
                    value: CitiesEnum.Kazan,
                  },
                  {
                    label: CitiesEnum.Irkutsk,
                    value: CitiesEnum.Irkutsk,
                  },
                  {
                    label: CitiesEnum.Habarovsk,
                    value: CitiesEnum.Habarovsk,
                  },
                ]}
                initialValue={filters.city}
                onClick={(value: string) => {
                  setFilters(
                    {
                      ...filters,
                      city: value as CitiesEnum,
                    },
                    true
                  );
                  if (handleSetSelectedCity) {
                    handleSetSelectedCity(value as CitiesEnum);
                  }
                }}
              />
            </div>
          }
          placement={tooltipPlacement}
          className={css.geolocationPopup}
        >
          <div onClick={() => setIsOpen(true)}>{filters.city}</div>
        </Tooltip>
      </div>
    </div>
  );
};

export default CityGeolocation;
