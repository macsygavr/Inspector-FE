import React, { FC, useEffect, useState } from "react";
import { Modal, ModalProps } from "antd";
import css from "../index.module.css";
import Button from "../../UiKit/Button/Button";
import ModalCloseIcon from "../../../assets/Icons/ModalCloseIcon";
import RevizorSmileIcon from "../../../assets/Icons/RevizorSmileIcon";

type Props = {
  onCancel: () => void;
} & ModalProps;

const ContactModal: FC<Props> = ({ onCancel, ...props }) => {
  return (
    <div className={css.container}>
      <Modal
        className={css.modal}
        closable={false}
        footer={null}
        wrapClassName={css.modalWrap}
        rootClassName={css.modalRoot}
        {...props}
      >
        <div className={css.header}>
          <span>Консультация</span>
          <button className={css.closeIcon} onClick={onCancel}>
            <ModalCloseIcon />
          </button>
        </div>
        <div className={css.modalContactBodyContainer}>
          <div className={css.iconContainer}>
            <RevizorSmileIcon />
          </div>
          <div className={css.title}>Ваши данные успешно получены</div>
          <div className={css.subtitle}>Наш менеджер скоро с вами свяжется</div>
        </div>
        <div className={css.footer}>
          <Button className={css.loginBtn} onClick={onCancel} variant="primary">
            Понятно
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactModal;
