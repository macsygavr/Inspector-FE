import React, { FC } from "react";
import css from "./index.module.css";

type Props = {
  color?: string;
};

const MetroIcon: FC<Props> = ({ color }) => (
  <div className={css.container} style={{ background: color }}></div>
);

export default MetroIcon;
