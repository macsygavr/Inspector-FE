import { Slider } from "antd";
import React, { FC, useEffect, useState } from "react";
import css from "./index.module.css";
import cn from "classnames";
import { removeNonDigits, splitByThreeDigits } from "./helpers";
import { FieldInputProps } from "react-final-form";

const mobileDeviceRE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

type Props = {
  type?: "range" | "line";
  unit?: string;
  min?: number;
  max?: number;
  label?: string;
  isSplitByThreeDigits?: boolean;
  step?: number;
  disabled?: boolean;
} & Partial<FieldInputProps<any, HTMLElement>>;

const InputRange: FC<Props> = ({
  type = "range",
  unit,
  min = 0,
  max = 0,
  label,
  isSplitByThreeDigits,
  step = 1,
  disabled,
  ...props
}) => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [minInputWidth, setMinInputWidth] = useState(String(min).length);
  const [maxInputWidth, setMaxInputWidth] = useState(String(min).length);
  const [splittedFrom, setSplittedFrom] = useState("");
  const [splittedTo, setSplittedTo] = useState("");
  const [searchRange, setSearchRange] = useState(0);

  useEffect(() => {
    setIsMobileDevice(mobileDeviceRE.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (isSplitByThreeDigits) {
      setSplittedFrom(splitByThreeDigits(String(props.value?.[0] ?? 0)));
      setSplittedTo(splitByThreeDigits(String(props.value?.[1] ?? 0)));
    }
    setMinInputWidth(
      (String(props.value?.[0]).length + (isMobileDevice ? 3 : 1)) *
        (isSplitByThreeDigits ? 9 : 8)
    );
    setMaxInputWidth(
      (String(props.value?.[1]).length + (isMobileDevice ? 3 : 1)) *
        (isSplitByThreeDigits ? 9 : 8)
    );
  }, [
    isSplitByThreeDigits,
    props.value?.[0],
    props.value?.[1],
    searchRange,
    isMobileDevice,
    splitByThreeDigits,
  ]);

  return (
    <div className={css.container}>
      <div className={css.label}>{label}</div>
      <div className={css.sliderContainer}>
        <div className={css.sliderValues}>
          {type === "range" ? (
            <>
              <div className={css.inputContainer}>
                <input
                  style={{ width: `${minInputWidth}px` }}
                  className={css.input}
                  type="tel"
                  value={isSplitByThreeDigits ? splittedFrom : props.value?.[0]}
                  onChange={(e) => {
                    const currentValue = removeNonDigits(e.target.value);
                    props.onChange &&
                      props.onChange([
                        Number(currentValue ?? 0),
                        props.value?.[1],
                      ]);
                  }}
                  onBlur={() => {
                    if (props.value?.[0] > props.value?.[1]) {
                      props.onChange &&
                        props.onChange([props.value?.[1], props.value?.[0]]);
                    }
                  }}
                  disabled={disabled}
                />
                <span className={css.unitContainer}>{unit}</span>
              </div>
              <span className={css.hyphen}>–</span>{" "}
              <div className={css.inputContainer}>
                <input
                  style={{ width: `${maxInputWidth}px` }}
                  className={css.input}
                  type="tel"
                  value={isSplitByThreeDigits ? splittedTo : props.value?.[1]}
                  onChange={(e) => {
                    const currentValue = removeNonDigits(e.target.value);
                    props.onChange &&
                      props.onChange([
                        props.value?.[0],
                        Number(currentValue ?? 0),
                      ]);
                  }}
                  onBlur={() => {
                    if (props.value?.[0] > props.value?.[1]) {
                      props.onChange &&
                        props.onChange([props.value?.[1], props.value?.[0]]);
                    }
                  }}
                  disabled={disabled}
                />
                <span className={css.unitContainer}>{unit}</span>
              </div>
            </>
          ) : (
            <>
              {searchRange} {unit}
            </>
          )}
        </div>
        {type === "range" ? (
          <Slider
            range
            className={css.slider}
            min={min}
            max={max}
            defaultValue={[props.value?.[0] ?? 0, props.value?.[1] ?? 0]}
            tooltip={{
              open: false,
            }}
            onChange={(value) => {
              props.onChange && props.onChange([value[0], value[1]]);
            }}
            step={step}
            value={[props.value?.[0], props.value?.[1]]}
            disabled={disabled}
          />
        ) : (
          <Slider
            className={cn(css.slider, css.searchRangeSlider)}
            onChange={(value) => {
              setSearchRange(value);
            }}
            tooltip={{
              open: false,
            }}
            max={10}
          />
        )}
      </div>
    </div>
  );
};

export default InputRange;
