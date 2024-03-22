import { AutoComplete, Input, Select } from "antd";
import React, { FC, useEffect, useMemo, useState } from "react";
import css from "./index.module.css";
import CloseIcon from "../../../assets/Icons/CloseIcon";
import RangeButton from "./components/RangeButton/RangeButton";
import { FieldInputProps } from "react-final-form";
import { FiltersFormValues } from "../../../pages/AllReportsPage/components/Filters/Filters";
import { getAddressSuggestions } from "../../../api/yandexApi";
import { debounce } from "../../../lib/throttleDebounce";
import cn from 'classnames'

type OptionsType = {
  value: string;
  address: string;
  area: string;
}[];

type Props = {
  withRange?: boolean;
  label?: string;
  customPlaceholder?: string;
  filters?: FiltersFormValues;
  classNameCustom?: string;
  onSetFilters?: (value: FiltersFormValues) => void;
} & Partial<FieldInputProps<any, HTMLElement>>;

const InputSearch: FC<Props> = ({
  withRange,
  label,
  customPlaceholder,
  filters,
  classNameCustom,
  onSetFilters,
  ...props
}) => {
  const [options, setOptions] = useState<OptionsType>([]);
  const [selectedRange, setSelectedRange] = useState<number>(
    filters?.radius ?? 1
  );

  const dataSource = useMemo(
    () =>
      options?.map((item, index) => (
        <Select.Option
          key={`${item.value} ${index}`}
          value={item.value}
          label={item.value}
        >
          <div className={css.customOption}>
            <span className={css.address}>{item.address}</span>
            <span className={css.area}>{item.area}</span>
          </div>
        </Select.Option>
      )),
    [options]
  );

  const handleSetSelectedRange = (value: number) => {
    if (onSetFilters) {
      onSetFilters({
        ...filters,
        radius: value,
      });
    }
    setSelectedRange(value);
  };

  const debounceGetAddressSuggestions = useMemo(
    () =>
      debounce((city: string, value: string) => {
        getAddressSuggestions(city, value).then((data) => {
          setOptions(
            data?.results?.map((item) => ({
              value: item?.title?.text ?? "",
              address: item?.title?.text ?? "",
              area: item?.subtitle?.text ?? "",
            }))
          );
        });
      }, 300),
    []
  );

  const handleOnChange = (value: string) => {
    debounceGetAddressSuggestions(filters?.city ?? "", value);

    if (filters && onSetFilters) {
      onSetFilters({
        ...filters,
        address: value,
        radius: selectedRange,
      });
    }

    if (props.onChange) {
      props.onChange(value);
    }
  };

  const onSelectAddress = (value: string) => {
    if (props.onChange) {
      props.onChange(value);
    }

    if (filters && onSetFilters) {
      onSetFilters({
        ...filters,
        address: value,
        radius: selectedRange,
      });
    }
  };

  useEffect(() => {
    setOptions([]);
  }, [filters?.city]);

  return (
    <div className={cn(css.container, classNameCustom)}>
      {label && <div className={css.label}>{label}</div>}
      <AutoComplete
        onChange={handleOnChange}
        onSelect={onSelectAddress}
        dataSource={dataSource}
        popupClassName={css.customPopup}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        className={css.autocompleteContainer}
        value={filters?.address ?? ""}
      >
        <Input
          {...props}
          allowClear={{
            clearIcon: <CloseIcon />,
          }}
          type="search"
          placeholder={customPlaceholder || "Адрес"}
          className={css.customInput}
          suffix={
            withRange && (
              <div className={css.rangeButtonsContainer}>
                <RangeButton
                  range={1}
                  selectedRange={filters?.radius ?? 1}
                  onClick={handleSetSelectedRange}
                />
                <RangeButton
                  range={3}
                  selectedRange={filters?.radius ?? 1}
                  onClick={handleSetSelectedRange}
                />
              </div>
            )
          }
        />
      </AutoComplete>
    </div>
  );
};

export default InputSearch;
