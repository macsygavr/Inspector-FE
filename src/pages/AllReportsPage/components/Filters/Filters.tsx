import { Modal, ModalProps } from "antd";
import React, { FC } from "react";
import ModalCloseIcon from "../../../../assets/Icons/ModalCloseIcon";
import css from "./index.module.css";

import cn from "classnames";
import { Field, Form } from "react-final-form";
import Button from "../../../../components/UiKit/Button/Button";
import InputSearch from "../../../../components/UiKit/InputSearch/InputSearch";
import Chips from "../../../../components/UiKit/Chips/Chips";
import InputRange from "../../../../components/UiKit/InputRange/InputRange";
import CityGeolocation, {
  CitiesEnum,
} from "../CityGeolocation/CityGeolocation";
import { SliderValues } from "../../../../api/reportsApi";

export type FiltersFormValues = {
  city?: CitiesEnum;
  address?: string;
  radius?: number;
  apartmentType?: string[];
  roomsCount?: string[];
  cost?: number[];
  square?: number[];
  ceilingHeight?: number[];
  floor?: number[];
  finishing?: string[];
  layout?: string[];
  windowView?: string[];
  houseType?: string[];
  year?: number[];
  floorsCount?: number[];
  hasElevator?: string[];
  hasParking?: string[];
};

type Props = {
  sliderValues: SliderValues | null;
  filters: FiltersFormValues;
  setFilters: (value: FiltersFormValues) => void;
  clearFilters: () => void;
  onCancel: () => void;
  disableSliders?: boolean;
} & ModalProps;

const Filters: FC<Props> = ({
  sliderValues,
  filters,
  setFilters,
  clearFilters,
  onCancel,
  disableSliders,
  ...props
}) => (
  <div className={css.container}>
    <Modal
      className={css.modal}
      wrapClassName={css.modalWrap}
      closable={false}
      footer={null}
      {...props}
    >
      <div className={css.header}>
        <span>Все фильтры</span>
        <button className={css.closeIcon} onClick={onCancel}>
          <ModalCloseIcon />
        </button>
      </div>
      <Form
        onSubmit={onCancel}
        initialValues={{
          ...filters,
        }}
      >
        {({ handleSubmit }) => (
          <form id="all-filters" onSubmit={handleSubmit}>
            <div className={css.filtersContainer}>
              <div className={css.row1}>
                <Field
                  name="city"
                  type="input"
                  render={({ input }) => (
                    <CityGeolocation
                      {...input}
                      tooltipPlacement="bottomLeft"
                      groupName={"geolocation2"}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  )}
                />
                <Field
                  name="address"
                  type="input"
                  render={({ input }) => (
                    <InputSearch
                      {...input}
                      filters={filters}
                      onSetFilters={setFilters}
                      withRange
                      classNameCustom={css.searchInputContainer}
                    />
                  )}
                />
              </div>
              <div className={css.blockContainer}>
                <span className={css.blockTitle}>Объект</span>
                <div className={css.row2}>
                  <span className={css.rowTitle}>Тип объекта</span>
                  <div className={css.chipsContainer}>
                    <Field
                      name="apartmentType"
                      type="input"
                      render={({ input }) => (
                        <Chips
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              apartmentType: value,
                            });
                          }}
                          tagsData={["Квартира", "Апартаменты"]}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css.row2}>
                  <span className={css.rowTitle}>Количество комнат</span>
                  <div className={css.chipsContainer}>
                    <Field
                      name="roomsCount"
                      type="input"
                      render={({ input }) => (
                        <Chips
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              roomsCount: value,
                            });
                          }}
                          initialSelected={filters.roomsCount}
                          tagsData={[
                            "Студия",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={cn(css.rangeInputsRow, css.flexColumn)}>
                  <div className={css.rangeInputContainer}>
                    <span className={css.rowTitle}>Стоимость</span>
                    <Field
                      name="cost"
                      type="input"
                      render={({ input }) => (
                        <InputRange
                          disabled={disableSliders}
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              cost: value,
                            });
                          }}
                          value={[
                            filters.cost?.[0] ?? sliderValues?.cost?.from ?? 0,
                            filters.cost?.[1] ?? sliderValues?.cost?.to ?? 0,
                          ]}
                          type="range"
                          unit="₽"
                          min={sliderValues?.cost?.from}
                          max={sliderValues?.cost?.to}
                          isSplitByThreeDigits
                          step={50000}
                        />
                      )}
                    />
                  </div>
                  <div className={css.rangeInputContainer}>
                    <span className={css.rowTitle}>Площадь</span>
                    <Field
                      name="square"
                      type="input"
                      render={({ input }) => (
                        <InputRange
                          disabled={disableSliders}
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              square: value,
                            });
                          }}
                          value={[
                            filters.square?.[0] ??
                              sliderValues?.square?.from ??
                              0,
                            filters.square?.[1] ??
                              sliderValues?.square?.to ??
                              0,
                          ]}
                          type="range"
                          unit="м²"
                          min={sliderValues?.square?.from}
                          max={sliderValues?.square?.to}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css.rangeInputsRow}>
                  <div className={css.rangeInputContainer}>
                    <span className={css.rowTitle}>Высота потолков</span>
                    <Field
                      name="ceilingHeight"
                      type="input"
                      render={({ input }) => (
                        <InputRange
                          disabled={disableSliders}
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              ceilingHeight: value,
                            });
                          }}
                          value={[
                            filters.ceilingHeight?.[0] ??
                              sliderValues?.ceilingHeight?.from ??
                              0,
                            filters.ceilingHeight?.[1] ??
                              sliderValues?.ceilingHeight?.to ??
                              0,
                          ]}
                          type="range"
                          unit="м"
                          min={sliderValues?.ceilingHeight?.from}
                          max={sliderValues?.ceilingHeight?.to}
                          step={0.1}
                        />
                      )}
                    />
                  </div>
                  <div className={css.rangeInputContainer}>
                    <span className={css.rowTitle}>Этаж</span>
                    <Field
                      name="floor"
                      type="input"
                      render={({ input }) => (
                        <InputRange
                          disabled={disableSliders}
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              floor: value,
                            });
                          }}
                          value={[
                            filters.floor?.[0] ??
                              sliderValues?.floor?.from ??
                              0,
                            filters.floor?.[1] ?? sliderValues?.floor?.to ?? 0,
                          ]}
                          type="range"
                          min={sliderValues?.floor?.from}
                          max={sliderValues?.floor?.to}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css.row2}>
                  <span className={css.rowTitle}>Отделка</span>
                  <div className={css.chipsContainer}>
                    <Field
                      name="finishing"
                      type="input"
                      render={({ input }) => (
                        <Chips
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              finishing: value,
                            });
                          }}
                          initialSelected={filters.finishing}
                          tagsData={[
                            "Дизайнерская",
                            "Евроремонт",
                            "Чистовая",
                            "Требуется ремонт",
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css.row2}>
                  <span className={css.rowTitle}>Вид планировки</span>
                  <div className={css.chipsContainer}>
                    <Field
                      name="layout"
                      type="input"
                      render={({ input }) => (
                        <Chips
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              layout: value,
                            });
                          }}
                          initialSelected={filters.layout}
                          tagsData={[
                            "Изолированная",
                            "Смежная",
                            "Смежно-изолированная",
                            "Свободная",
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css.row2}>
                  <span className={css.rowTitle}>Вид из окна</span>
                  <div className={css.chipsContainer}>
                    <Field
                      name="windowView"
                      type="input"
                      render={({ input }) => (
                        <Chips
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              windowView: value,
                            });
                          }}
                          initialSelected={filters.windowView}
                          tagsData={[
                            "На улицу",
                            "Во двор",
                            "Во двор и на улицу",
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className={css.blockContainer}>
                <span className={css.blockTitle}>Жилой комплекс</span>
                <div className={css.row2}>
                  <span className={css.rowTitle}>Тип дома</span>
                  <div className={css.chipsContainer}>
                    <Field
                      name="houseType"
                      type="input"
                      render={({ input }) => (
                        <Chips
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              houseType: value,
                            });
                          }}
                          initialSelected={filters.houseType}
                          tagsData={[
                            "Монолитный",
                            "Кирпичный",
                            "Деревянный",
                            "Монолитно-кирпичный",
                            "Блочный",
                            "Панельный",
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className={css.rangeInputsRow}>
                  <div className={css.rangeInputContainer}>
                    <span className={css.rowTitle}>Год постройки</span>
                    <Field
                      name="year"
                      type="input"
                      render={({ input }) => (
                        <InputRange
                          disabled={disableSliders}
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              year: value,
                            });
                          }}
                          value={[
                            filters.year?.[0] ?? sliderValues?.year?.from ?? 0,
                            filters.year?.[1] ?? sliderValues?.year?.to ?? 0,
                          ]}
                          type="range"
                          min={sliderValues?.year?.from}
                          max={sliderValues?.year?.to}
                        />
                      )}
                    />
                  </div>
                  <div className={css.rangeInputContainer}>
                    <span className={css.rowTitle}>Этажей в доме</span>
                    <Field
                      name="floorsCount"
                      type="input"
                      render={({ input }) => (
                        <InputRange
                          disabled={disableSliders}
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              floorsCount: value,
                            });
                          }}
                          value={[
                            filters.floorsCount?.[0] ??
                              sliderValues?.totalFloors?.from ??
                              0,
                            filters.floorsCount?.[1] ??
                              sliderValues?.totalFloors?.to ??
                              0,
                          ]}
                          type="range"
                          min={sliderValues?.totalFloors?.from}
                          max={sliderValues?.totalFloors?.to}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css.row2}>
                  <span className={css.rowTitle}>Наличие лифта</span>
                  <div className={css.chipsContainer}>
                    <Field
                      name="hasElevator"
                      type="input"
                      render={({ input }) => (
                        <Chips
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              hasElevator: value,
                            });
                          }}
                          initialSelected={filters.hasElevator}
                          tagsData={["Не важно", "Есть", "Нет"]}
                          singleMode
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css.row2}>
                  <span className={css.rowTitle}>Паркинг</span>
                  <div className={css.chipsContainer}>
                    <Field
                      name="hasParking"
                      type="input"
                      render={({ input }) => (
                        <Chips
                          {...input}
                          onChange={(value) => {
                            input.onChange(value);
                            setFilters({
                              ...filters,
                              hasParking: value,
                            });
                          }}
                          initialSelected={filters.hasParking}
                          tagsData={["Не важно", "Есть", "Нет"]}
                          singleMode
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={css.footer}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  clearFilters();
                }}
                variant="ghost"
              >
                Сбросить
              </Button>
              <Button variant="secondary">Показать объекты</Button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  </div>
);

export default Filters;
