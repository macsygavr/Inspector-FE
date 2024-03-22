import React, { FC } from "react";
import { Switch as AntdSwitch, ConfigProvider, SwitchProps } from "antd";
import css from "./index.module.css";

const Switch: FC<SwitchProps> = (props) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#FF6503",
        colorPrimaryHover: "#FF6503",
        colorTextQuaternary: "#F1F0F5",
        colorTextTertiary: "#F1F0F5"
      },
    }}
  >
    <AntdSwitch {...props} className={css.customSwitch} />
  </ConfigProvider>
);

export default Switch;
