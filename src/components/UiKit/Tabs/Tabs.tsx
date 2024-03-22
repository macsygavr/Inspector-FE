import { Tabs as AntdTabs, ConfigProvider, TabsProps } from "antd";
import React, { FC } from "react";
import css from "./index.module.css";
import cn from "classnames";

const Tabs: FC<TabsProps> = ({ type, className, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FF6503",
          colorPrimaryHover: "#FF6503",
          colorPrimaryActive: "#FF6503",
        },
      }}
    >
      <AntdTabs
        {...props}
        className={cn(
          type === "line" && css.customLineTabs,
          type === "card" && css.customCardTabs,
          className
        )}
        type={type}
      />
    </ConfigProvider>
  );
};

export default Tabs;
