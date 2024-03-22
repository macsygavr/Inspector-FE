import React, { FC, useEffect, useRef, useState } from "react";
import css from "./index.module.css";
import cn from "classnames";
import { removeNonDigits } from "../InputRange/helpers";
import { getMockArrayForSkeletons } from "../../../lib/helpers";

type Props = {
  code: string;
  error?: boolean;
  onCodeChange: (value: string) => void;
  onChange: (value: string) => void;
  handleSubmit: () => void;
};

const InputCode: FC<Props> = ({
  code,
  error,
  onChange,
  onCodeChange,
  handleSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className={cn(css.code, error && css.withError)}>
        <input
          ref={inputRef}
          autoFocus={true}
          type="tel"
          value={code}
          autoComplete="one-time-code"
          onChange={(e) => {
            e.preventDefault();
            const value = removeNonDigits(e.target.value).slice(0, 4);
            onCodeChange(value);
            onChange(value);
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" && handleSubmit) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          onPaste={(e) => {
            const value = removeNonDigits(
              e.clipboardData.getData("text/plain")
            ).slice(0, 4);
            onCodeChange(value);
            onChange(value);
          }}
        />
        <div
          className={css.spanContainer}
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          {getMockArrayForSkeletons(4).map((_, index) => (
            <span className={css.codeSpan} key={index}>
              {code[index] ?? <span className={css.placeholderZero}>0</span>}
            </span>
          ))}
        </div>
      </div>
      {error && <div className={css.error}>Код введен неверно</div>}
    </>
  );
};

export default InputCode;
