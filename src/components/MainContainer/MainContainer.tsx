import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import css from "./index.module.css";

const MainContainer: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <div className={css.container}>
      <div className={css.content}>{children}</div>
    </div>
    <Footer />
  </>
);

export default MainContainer;
