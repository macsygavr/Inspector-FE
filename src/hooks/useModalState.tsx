import { useCallback, useEffect, useState } from "react";

type ReturnType<T> = {
  opened: boolean;
  open(data?: T): void;
  close(): void;
  turnOpened(): void;
  modalData: T | null;
};

/** Хук позволяет гарантировать отображаемое состояние в модальном окне */
export const useModalState = <
  ModalData extends Record<string, unknown>
>(): ReturnType<ModalData> => {
  const [opened, setOpened] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const close = useCallback(() => {
    setOpened(false);
    setModalData(null);
  }, []);

  const open = useCallback((data?: ModalData) => {
    setOpened(true);
    if (data) {
      setModalData(data);
    }
  }, []);

  const turnOpened = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  useEffect(() => {
    const nextContainer: HTMLElement | null = document.querySelector("#__next");

    if (nextContainer) {
      if (opened) {
        nextContainer.style.width = "100vw";
      } else {
        nextContainer.style.width = "";
      }
    }

    if (opened) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
      document.body.style.overflow = "hidden";
    }
    if (!opened) {
      const scrollY = document.body.style.top;
      document.body.style.top = "";
      document.body.style.position = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [opened]);

  return { opened, open, close, turnOpened, modalData };
};
