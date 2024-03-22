import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// хук чтобы не получать ошибку react-hydration-error. Возникает из за ssr. Нужен ли ssr?
const useCustomMediaQuery = (query: string) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const isSmallScreenQuery = useMediaQuery({ query });

  useEffect(() => {
    setIsSmallScreen(isSmallScreenQuery);
  }, [isSmallScreenQuery]);

  return isSmallScreen;
};

export default useCustomMediaQuery;
