import React, { FC, useEffect, useRef, useState } from "react";
import PinSmallIcon from "../../../../assets/Icons/PinSmallIcon";
import { TooltipPlacement } from "antd/es/tooltip";
import { FieldInputProps } from "react-final-form";
import css from "./index.module.css";
import Tooltip from "../../../../components/UiKit/Tooltip/Tooltip";
import RadioGroup from "../../../../components/UiKit/RadioGroup/RadioGroup";
import Down from "../../../../assets/Icons/Down";
import Up from "../../../../assets/Icons/Up";

export enum SortEnum {
  New = "Сначала новые",
  Old = "Сначала старые",
}

type Props = {
  tooltipPlacement?: TooltipPlacement;
  value?: SortEnum;
  setValue: (value: SortEnum) => void;
} & Partial<FieldInputProps<any, HTMLElement>>;

const SortPopup: FC<Props> = ({
  tooltipPlacement = "bottomRight",
  value,
  setValue,
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
                groupName={"sort"}
                options={[
                  {
                    label: SortEnum.New,
                    value: SortEnum.New,
                  },
                  {
                    label: SortEnum.Old,
                    value: SortEnum.Old,
                  },
                ]}
                initialValue={value}
                onClick={(value) => {
                  setValue(value as SortEnum);
                }}
              />
            </div>
          }
          placement={tooltipPlacement}
          className={css.geolocationPopup}
        >
          <div onClick={() => setIsOpen(true)}>{value}</div>
        </Tooltip>
      </div>
      <div onClick={() => setIsOpen(true)} className={css.pinIconContainer}>
        {isOpen ? <Up /> : <Down />}
      </div>
    </div>
  );
};

export default SortPopup;
